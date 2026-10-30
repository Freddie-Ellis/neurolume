/**
 * The three.js scene, a 2D orthographic camera with pan and zoom, and the
 * bloom post-processing pass. Frames are only drawn when something changes,
 * so an idle viewer costs nothing.
 */
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import type { Theme } from "../theme";

export interface Bounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const MIN_ZOOM = 0.05;
const MAX_ZOOM = 20;
/** Rendering above 2x pixel density costs a lot of GPU time for detail nobody can see. */
export const MAX_PIXEL_RATIO = 2;
const LOW_DETAIL_ZOOM = 0.45;
/** Below this, overview cards show only their names: their detail lines and link chips are wider than the cards. */
const MEDIUM_DETAIL_ZOOM = 0.8;

/** After a zoom pause ends, zoom speed eases from 0 back to full over this long. */
const ZOOM_EASE_IN_MS = 500;

export class Viewer {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1000, 1000);
  readonly renderer: THREE.WebGLRenderer;
  private readonly labelRenderer = new CSS2DRenderer();
  private readonly composer: EffectComposer;
  private readonly bloomPass: UnrealBloomPass;
  /** Glow is always on for themes that have it (dark) and off for those that don't (light). */
  private themeHasBloom = true;
  private needsRender = true;
  /** Called after the user zooms with the scroll wheel (not after fitTo), with the new zoom and the cursor position. */
  onUserZoom: ((zoom: number, clientX: number, clientY: number) => void) | null = null;
  /** Called after the view changes size (a browser window or a Qt widget being laid out). */
  onResize: (() => void) | null = null;
  /** Scroll zooming is ignored until this time (performance.now() ms), then eases back in. */
  private zoomPausedUntil = 0;
  /** Screen space (CSS px) at the top that fitTo keeps clear, e.g. for the title card. */
  fitInsetTop: () => number = () => 0;
  /** The same at the bottom and on the left, e.g. for the depth tree (below a short one, beside a tall one). */
  fitInsetBottom: () => number = () => 0;
  fitInsetLeft: () => number = () => 0;
  /** The furthest the user can zoom out with the wheel; set from the current view's fit zoom. */
  minZoom = MIN_ZOOM;

  constructor(
    private readonly container: HTMLElement,
    theme: Theme,
  ) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
    container.append(this.renderer.domElement);

    this.labelRenderer.domElement.className = "labels";
    container.append(this.labelRenderer.domElement);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0, 0, 1);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(new OutputPass());
    this.applyTheme(theme);

    this.camera.position.z = 10;
    new ResizeObserver(() => this.resize()).observe(container);
    this.resize();
    this.attachPanZoom();
    this.renderer.setAnimationLoop(() => this.renderIfNeeded());
  }

  requestRender(): void {
    this.needsRender = true;
  }

  /** Switch the background and glow to a theme. The network itself is rebuilt by the caller. */
  applyTheme(theme: Theme): void {
    if (this.scene.background instanceof THREE.Texture) this.scene.background.dispose();
    this.scene.background = gradientTexture(theme.backgroundTop, theme.backgroundBottom);
    this.themeHasBloom = theme.bloom !== null;
    if (theme.bloom) {
      this.bloomPass.strength = theme.bloom.strength;
      this.bloomPass.radius = theme.bloom.radius;
      this.bloomPass.threshold = theme.bloom.threshold;
    }
    this.requestRender();
  }

  /** Centre `bounds` in the view below fitInsetTop() and zoom so they fill most of it. */
  fitTo(bounds: Bounds, margin = 0.88): void {
    this.place(this.fitTarget(bounds, margin));
  }

  /** The zoom fitTo would pick for `bounds` at the current size, without moving the camera. */
  fitZoomFor(bounds: Bounds, margin = 0.88): number {
    return this.fitTarget(bounds, margin).zoom;
  }

  /** Where `bounds` are on screen now: centre (CSS px from the middle of the view, y up) and size. */
  screenRect(bounds: Bounds): { x: number; y: number; width: number; height: number } {
    const zoom = this.camera.zoom;
    return {
      x: ((bounds.left + bounds.right) / 2 - this.camera.position.x) * zoom,
      y: ((bounds.top + bounds.bottom) / 2 - this.camera.position.y) * zoom,
      width: (bounds.right - bounds.left) * zoom,
      height: (bounds.top - bounds.bottom) * zoom,
    };
  }

  /**
   * Place the camera so `bounds` cover the same screen area as `rect` (as from
   * screenRect), centred on it, but never further out than `minZoom`. Area, not
   * "fit inside": a boxy card framed in a wide, flat rect would shrink to its height.
   */
  frameIn(bounds: Bounds, rect: { x: number; y: number; width: number; height: number }): void {
    const area = (rect.width * rect.height) / (Math.max(bounds.right - bounds.left, 1) * Math.max(bounds.top - bounds.bottom, 1));
    const zoom = clamp(Math.sqrt(area), Math.max(MIN_ZOOM, this.minZoom), MAX_ZOOM);
    this.place({ zoom, x: (bounds.left + bounds.right) / 2 - rect.x / zoom, y: (bounds.top + bounds.bottom) / 2 - rect.y / zoom });
  }

  private fitTarget(bounds: Bounds, margin: number): { zoom: number; x: number; y: number } {
    const { width, height } = this.size();
    const top = Math.min(this.fitInsetTop(), height / 3);
    const bottom = Math.min(this.fitInsetBottom(), height / 4);
    const left = Math.min(this.fitInsetLeft(), width / 3);
    const boundsWidth = Math.max(bounds.right - bounds.left, 1);
    const boundsHeight = Math.max(bounds.top - bounds.bottom, 1);
    const zoom = clamp(Math.min((width - left) / boundsWidth, (height - top - bottom) / boundsHeight) * margin, MIN_ZOOM, MAX_ZOOM);
    // Shift the camera so the bounds centre on the space between the insets.
    return { zoom, x: (bounds.left + bounds.right) / 2 - left / 2 / zoom, y: (bounds.top + bounds.bottom) / 2 + (top - bottom) / 2 / zoom };
  }

  private place({ zoom, x, y }: { zoom: number; x: number; y: number }): void {
    this.camera.zoom = zoom;
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.updateProjectionMatrix();
    this.requestRender();
  }

  /** Convert a mouse position to normalised device coordinates (-1 to 1). */
  toNdc(clientX: number, clientY: number): THREE.Vector2 {
    const rect = this.renderer.domElement.getBoundingClientRect();
    return new THREE.Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
  }

  private toWorld(clientX: number, clientY: number): THREE.Vector3 {
    const ndc = this.toNdc(clientX, clientY);
    return new THREE.Vector3(ndc.x, ndc.y, 0).unproject(this.camera);
  }

  /**
   * Ignore scroll zooming for `milliseconds`, so leftover scrolling doesn't
   * carry into a view that just opened. Afterwards zoom speed ramps back up
   * over ZOOM_EASE_IN_MS, so a scroll that is still going doesn't lurch.
   */
  pauseZoom(milliseconds: number): void {
    this.zoomPausedUntil = performance.now() + milliseconds;
  }

  /** 0 while paused, rising smoothly to 1 as the pause wears off. */
  private zoomStrength(): number {
    const t = (performance.now() - this.zoomPausedUntil) / ZOOM_EASE_IN_MS;
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return t * t * (3 - 2 * t); // smoothstep
  }

  /** The view's size in CSS pixels. */
  size(): { width: number; height: number } {
    return { width: this.container.clientWidth || 1, height: this.container.clientHeight || 1 };
  }

  private resize(): void {
    const { width, height } = this.size();
    // One world unit is one CSS pixel at zoom 1.
    Object.assign(this.camera, { left: -width / 2, right: width / 2, top: height / 2, bottom: -height / 2 });
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.labelRenderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.requestRender();
    this.onResize?.();
  }

  private renderIfNeeded(): void {
    if (!this.needsRender) return;
    this.needsRender = false;
    if (this.themeHasBloom) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
    // Zoomed out, secondary labels would overlap, so CSS hides them, in two steps.
    const zoom = this.camera.zoom;
    this.labelRenderer.domElement.dataset.detail = zoom < LOW_DETAIL_ZOOM ? "low" : zoom < MEDIUM_DETAIL_ZOOM ? "medium" : "full";
    this.labelRenderer.domElement.style.setProperty("--zoom", String(zoom));
    this.labelRenderer.render(this.scene, this.camera);
  }

  private attachPanZoom(): void {
    const canvas = this.renderer.domElement;
    let dragStart: { x: number; y: number } | null = null;

    canvas.addEventListener("pointerdown", (event) => {
      dragStart = { x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener("pointermove", (event) => {
      if (!dragStart) return;
      this.camera.position.x -= (event.clientX - dragStart.x) / this.camera.zoom;
      this.camera.position.y += (event.clientY - dragStart.y) / this.camera.zoom;
      dragStart = { x: event.clientX, y: event.clientY };
      this.requestRender();
    });
    const endDrag = () => (dragStart = null);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);

    canvas.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        const strength = this.zoomStrength();
        if (strength === 0) return;
        // Zoom towards the cursor: keep the world point under it fixed.
        const before = this.toWorld(event.clientX, event.clientY);
        // A wheel notch is about 100 in Chrome but 60 in Qt's web view: count any notch-sized step as
        // at least 100, so a wheel zooms the same everywhere; small touchpad steps stay fine-grained.
        const delta = Math.abs(event.deltaY) >= 40 ? Math.sign(event.deltaY) * Math.max(Math.abs(event.deltaY), 100) : event.deltaY;
        const zoom = clamp(this.camera.zoom * Math.exp(-delta * 0.0015 * strength), this.minZoom, MAX_ZOOM);
        if (zoom === this.camera.zoom) return; // at a limit: don't drift the view
        this.camera.zoom = zoom;
        this.camera.updateProjectionMatrix();
        const after = this.toWorld(event.clientX, event.clientY);
        this.camera.position.x += before.x - after.x;
        this.camera.position.y += before.y - after.y;
        this.requestRender();
        this.onUserZoom?.(this.camera.zoom, event.clientX, event.clientY);
      },
      { passive: false },
    );
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function gradientTexture(top: string, bottom: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 256;
  const context = canvas.getContext("2d")!;
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, top);
  gradient.addColorStop(1, bottom);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
