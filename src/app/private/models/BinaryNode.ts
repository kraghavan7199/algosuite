import { TreeNode } from "primeng/api";

export interface BinaryNode extends TreeNode {
    data: {
      value: number | string;
      id: string;
    };
    children?: BinaryNode[];
  }