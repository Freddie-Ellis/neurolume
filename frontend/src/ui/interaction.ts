/**
 * Hover and click behaviour: hovering a layer brightens its border and edges
 * and shows a tooltip; clicking opens the inspector; double-clicking a layer
 * focuses it, and double-clicking empty space fits the whole network.
 */
import * as THREE from "three";
import { setEdgeOpacity } from "../render/edges";
import type { Network, Pickable } from "../render/network";
import { escapeHtml, setHighlight, titleFor } from "../render/network";
import type { Viewer } from "../render/viewer";
import { formatActivation, formatParams, formatShape } from "./format";
import type { Inspector } from "./inspector";

const CLICK_TOLERANCE = 4; // pixels the mouse may move and still count as a click
/** Ignore clicks this soon after a view opens, so a double-click that opened it doesn't also act on it. */
const SETTLE_MS = 400;

export interface Interaction {
  clearSelection: () => void;
  /** Remove every listener, e.g. before the network is rebuilt for a new theme. */
  detach: () => void;
}

const raycaster = new THREE.Raycaster();

/** The layer or card under a screen position, if any. */
export function pickAt(viewer: Viewer, network: Network, clientX: number, clientY: number): Pickable | null {
  raycaster.setFromCamera(viewer.toNdc(clientX, clientY), viewer.camera);
  const hit = raycaster.intersectObjects(network.pickables.map((pickable) => pickable.mesh), false)[0];
  return hit ? (network.pickables.find((pickable) => pickable.mesh === hit.object) ?? null) : null;
}

export function attachInteraction(
  viewer: Viewer,
  network: Network,
  inspector: Inspector,
  tooltip: HTMLElement,
  fitAll: () => void,
): Interaction {
  const canvas = viewer.renderer.domElement;
  const listeners = new AbortController();
  const options = { signal: listeners.signal };
  let hovered: Pickable | null = null;
  let selected: Pickable | null = null;
  let downAt: { x: number; y: number } | null = null;
  const readyAt = performance.now() + SETTLE_MS;

  const pick = (event: MouseEvent) => pickAt(viewer, network, event.clientX, event.clientY);

  function refresh(): void {
    for (const pickable of network.pickables) {
      setHighlight(network.theme, pickable, pickable === hovered || pickable === selected);
    }
    const focus = hovered ?? selected;
    for (const bundle of network.edges) {
      const lit = !focus || focus.links.length === 0 || focus.links.includes(bundle);
      setEdgeOpacity(bundle, bundle.baseOpacity * (lit ? 1 : network.theme.dimmedEdges));
    }
    viewer.requestRender();
  }

  canvas.addEventListener(
    "pointermove",
    (event) => {
      const target = pick(event);
      if (target !== hovered) {
        hovered = target;
        canvas.style.cursor = target ? "pointer" : "grab";
        refresh();
      }
      if (target) {
        const { node } = target;
        const details = [
          node.output_shape.length > 0 ? formatShape(node.output_shape) : "",
          formatActivation(node.activation),
          node.param_count > 0 ? `${formatParams(node.param_count)} params` : "",
        ].filter(Boolean);
        tooltip.innerHTML =
          `<div class="tooltip-title">${escapeHtml(titleFor(node))} <span>${escapeHtml(node.label)}</span></div>` +
          `<div class="tooltip-meta">${details.map(escapeHtml).join(" · ")}</div>`;
        tooltip.style.transform = `translate(${event.clientX + 16}px, ${event.clientY + 16}px)`;
      }
      tooltip.hidden = !target || downAt !== null;
    },
    options,
  );

  canvas.addEventListener(
    "pointerleave",
    () => {
      hovered = null;
      tooltip.hidden = true;
      refresh();
    },
    options,
  );

  canvas.addEventListener("pointerdown", (event) => (downAt = { x: event.clientX, y: event.clientY }), options);

  canvas.addEventListener(
    "pointerup",
    (event) => {
      const start = downAt;
      downAt = null;
      if (performance.now() < readyAt) return;
      if (!start || Math.hypot(event.clientX - start.x, event.clientY - start.y) > CLICK_TOLERANCE) return;
      const target = pick(event);
      if (target?.activate) {
        target.activate();
        return;
      }
      selected = target;
      if (selected) inspector.show(selected.node);
      else inspector.hide();
      refresh();
    },
    options,
  );

  canvas.addEventListener(
    "dblclick",
    (event) => {
      if (performance.now() < readyAt) return;
      const target = pick(event);
      if (!target) {
        fitAll();
        return;
      }
      if (target.activate) return; // the click already opened it
      target.mesh.geometry.computeBoundingBox();
      const box = target.mesh.geometry.boundingBox!;
      viewer.fitTo({ left: box.min.x - 60, right: box.max.x + 60, top: box.max.y, bottom: box.min.y }, 0.8);
    },
    options,
  );

  return {
    clearSelection: () => {
      selected = null;
      refresh();
    },
    detach: () => {
      listeners.abort();
      tooltip.hidden = true;
    },
  };
}
