/**
 * Turns a block's Markdown notes into HTML, with LaTeX maths drawn by KaTeX
 * (no LaTeX install needed). The inspector imports this module only when it
 * shows a node that has notes, so Markdown and KaTeX aren't loaded otherwise.
 */
import DOMPurify from "dompurify";
import "katex/dist/katex.min.css";
import { Marked } from "marked";
import markedKatex from "marked-katex-extension";

// `nonStandard` accepts $x$ even when it touches other text, e.g. "($x$)".
const markdown = new Marked(markedKatex({ throwOnError: false, nonStandard: true }));

/** Markdown to safe HTML. Notes come from Python code, but the HTML may be exported and shared. */
export function renderMarkdown(source: string): string {
  return DOMPurify.sanitize(markdown.parse(source, { async: false }));
}
