export interface Node {
    value: number;
    uniqueId: string;
    left: Node | undefined;
    right: Node | undefined;
  }