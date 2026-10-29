/**
 * Turns a block's Markdown notes into an HTML page, with LaTeX maths drawn by
 * KaTeX (no LaTeX install needed). main.ts imports this module only when a
 * note is opened, so the Markdown and KaTeX code isn't loaded otherwise.
 */
import DOMPurify from "dompurify";
import "katex/dist/katex.min.css";
import { Marked } from "marked";
import markedKatex from "marked-katex-extension";
import type { GraphNode } from "../schema";

/** Width of a note page in world units (CSS pixels at zoom 1). */
export const NOTE_WIDTH = 720;

export interface NotePage {
  element: HTMLElement;
  width: number;
  height: number;
}

// `nonStandard` accepts $x$ even when it touches other text, e.g. "($x$)".
const markdown = new Marked(markedKatex({ throwOnError: false, nonStandard: true }));

/** Markdown to safe HTML. Notes come from Python code, but the HTML may be exported and shared. */
export function renderMarkdown(source: string): string {
  return DOMPurify.sanitize(markdown.parse(source, { async: false }));
}

/**
 * Build the page for a node's notes and measure it. The page is laid out once
 * off-screen (after its fonts load) so the viewer knows its height to fit it.
 */
export async function notePage(node: GraphNode): Promise<NotePage> {
  const element = document.createElement("article");
  element.className = "note-page";
  element.style.width = `${NOTE_WIDTH}px`;
  element.innerHTML = renderMarkdown(node.notes ?? "");

  const host = document.createElement("div");
  host.style.cssText = "position: absolute; top: 0; left: -10000px; visibility: hidden;";
  host.append(element);
  document.body.append(host);
  void element.offsetHeight; // lay it out, which starts loading the KaTeX fonts it uses
  await document.fonts.ready;
  const height = element.offsetHeight;
  host.remove();
  return { element, width: NOTE_WIDTH, height };
}
