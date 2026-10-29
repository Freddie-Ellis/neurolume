/**
 * Places a note page in the scene. CSS2DRenderer keeps HTML at a fixed size,
 * so just before each render the page scales itself by the camera zoom: it
 * then pans and zooms like everything else, while the text stays sharp.
 */
import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import type { Theme } from "../theme";
import type { NotePage } from "../ui/notes";
import type { Network } from "./network";

export function buildNote(page: NotePage, theme: Theme): Network {
  const anchor = document.createElement("div");
  anchor.append(page.element);
  const object = new CSS2DObject(anchor);
  object.center.set(0, 0); // the page's top-left corner sits at world (0, 0)
  object.onBeforeRender = (_renderer, _scene, camera) => {
    page.element.style.transform = `scale(${(camera as THREE.OrthographicCamera).zoom})`;
  };

  const root = new THREE.Group();
  root.add(object);
  return { root, pickables: [], edges: [], theme };
}
