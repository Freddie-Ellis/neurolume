import "./style.css";

type GraphNode = { label: string; output_shape?: number[] };
type Graph = { nodes: GraphNode[] };

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Neurolume mount element was not found");

const graph = await fetch("/api/graph").then((response) => {
  if (!response.ok) throw new Error(`Graph request failed: ${response.status}`);
  return response.json() as Promise<Graph>;
});

for (const node of graph.nodes) {
  const column = document.createElement("section");
  column.className = "column";
  column.innerHTML = `<h2>${node.label}</h2>`;
  const count = Math.min(node.output_shape?.[0] ?? 2, 4);
  for (let index = 0; index < count; index += 1) {
    const dot = document.createElement("span");
    dot.className = "node";
    column.append(dot);
  }
  app.append(column);
}
