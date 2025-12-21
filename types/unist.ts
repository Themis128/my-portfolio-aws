// Placeholder unist types
export interface Node {
  type: string;
  data?: Record<string, unknown>;
  position?: Record<string, unknown>;
}

export interface Parent extends Node {
  children: Node[];
}

export interface Element extends Parent {
  tagName: string;
  properties?: Record<string, unknown>;
}
