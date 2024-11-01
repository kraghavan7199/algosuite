import { CommonModule, Location } from "@angular/common";
import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import * as d3 from 'd3';
import { MessageService, TreeNode } from "primeng/api";
import { OrganizationChartModule } from "primeng/organizationchart";
import { ToastModule } from "primeng/toast";
import { TreeService } from "../../services/tree.service";
import { LengthFilterPipe } from "../../pipes/lengthfilter.pipe";
declare var bootstrap: any;


interface BinaryNode extends TreeNode {
  data: {
    value: number | string;
    id: string;
  };
  children?: BinaryNode[];
}

interface Node {
  value: number;
  uniqueId: string;
  left: Node | undefined;
  right: Node | undefined;
}

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule,
    OrganizationChartModule, ToastModule],
  providers: [MessageService, TreeService],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css'

})
export class TreeComponent {
  root!: BinaryNode;
  showModal = false;
  selectedNode: BinaryNode | null = null;
  newLeftNodeValue: number | null = null
  newRightNodeValue: number | null = null
  maxSum: any;
  path: any;
  highlightedNodeId: any = null;
  private isAnimating = false;
  depth = 0;
  @ViewChild('container') containerRef!: ElementRef;
  maxSumLabel!: 'From A Leaf Node To Any Node' | 'Between Any Two Nodes';

  isDragging = false;
  startX = 0;
  startY = 0;
  translateX = 0;
  translateY = 0;
  scale = 1;


  get transform() {
    return `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
  }

  constructor(private treeService: TreeService, private messageService: MessageService, private location: Location) { }

  ngOnInit() {
    this.getTree();

  }



  getTree() {
    this.treeService.getTree().subscribe((res: any) => {
      if (res.tree) {
        const binaryNode = this.convertNodeToBinaryNode(res.tree);
        if (binaryNode) {
          this.root = binaryNode;
        }
      }
      if (!res.tree) {
        this.initializeTree()
      }
    })
  }

  isNodeHighlighted(node: any) {
    return this.path && this.path.includes(node.data.id) && this.isAnimating
  }

  initializeTree() {
    this.root = {
      data: { value: 'Root', id: this.generateId() },
      children: [],
      expanded: true
    };
  }

  resetTree() {
    this.initializeTree();
    this.treeService.saveTree(null).subscribe(res => {
    });
  }

  openNodeModal(node: BinaryNode) {
    this.selectedNode = node;
    if(node.children && node.children[0] && node.children[0].data.value) {
       this.newLeftNodeValue =  <number>node.children[0
      
       ].data.value;
    }
    if(node.children && node.children[1] && node.children[1].data.value) {
      this.newRightNodeValue =  <number>node.children[1].data.value;
   }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedNode = null;
    this.newLeftNodeValue = null;
    this.newRightNodeValue = 0;
  }

  startAnimation() {
    this.isAnimating = true;
  }


  clearMaxSum() {
    this.maxSum = 0;
    this.isAnimating = false;
    this.highlightedNodeId = null;

  }


  calculateMaxSumPath(type: string) {
    this.clearMaxSum();
    this.maxSumLabel = type === 'maxLeafToNode' ? 'From A Leaf Node To Any Node' : 'Between Any Two Nodes';
    this.treeService.calculateMaxSumPath(type).subscribe((res: any) => {
      if (res) {
        this.maxSum = res.sum;
        this.path = res.path
        this.startAnimation();
      }
    })
  }

  saveChanges() {
    if ((this.selectedNode?.data.value === null || this.selectedNode?.data.value === 'Root') && (this.newLeftNodeValue !== null || this.newRightNodeValue !== null)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Current Node Value Can\'t Be Null ',
      });
      return;
    }
    this.addLeftChild();
    this.addRightChild();
    this.closeModal();
    const convertedTree = this.convertBinaryNodeToNode(this.root);
    this.treeService.saveTree(convertedTree).subscribe(res => {
    });


  }

  convertNodeToBinaryNode(node: Node | undefined): BinaryNode | undefined {
    if (!node) return undefined;

    const leftChild = this.convertNodeToBinaryNode(node.left);
    const rightChild = this.convertNodeToBinaryNode(node.right);

    const children = [leftChild, rightChild].filter(Boolean) as BinaryNode[];

    return {
      data: {
        value: node.value,
        id: node.uniqueId
      },
      expanded: true,
      children,
    };
  }

  convertBinaryNodeToNode(binaryNode: BinaryNode | undefined): Node | undefined {
    if (!binaryNode) return undefined;

    const leftChild = binaryNode.children?.[0];
    const rightChild = binaryNode.children?.[1];

    return {
      value: +binaryNode.data.value,
      uniqueId: binaryNode.data.id,
      left: this.convertBinaryNodeToNode(leftChild),
      right: this.convertBinaryNodeToNode(rightChild),
    };
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  createNewNode(value: number): BinaryNode {
    return {
      data: { value: value, id: this.generateId() },
      children: [],
      expanded: true
    };
  }

  hasLeftChild(): boolean {
    return this.selectedNode !== null && !!this.selectedNode.children && this.selectedNode.children[0] !== undefined;

  }

  hasRightChild(): boolean {
    return this.selectedNode !== null && !!this.selectedNode.children && this.selectedNode.children[1] !== undefined;
  }

  addLeftChild() {
    if (this.selectedNode && this.selectedNode.children && this.newLeftNodeValue) {
      if (!this.hasLeftChild()) {
        this.selectedNode.children[0] = this.createNewNode(this.newLeftNodeValue);
        return;
      }

    }


  }

  addRightChild() {
    if (this.selectedNode && this.selectedNode.children && this.newRightNodeValue) {

      if (!this.hasRightChild()) {
        this.selectedNode.children[1] = this.createNewNode(this.newRightNodeValue);
        return;
      }
    }
  }

  deleteNode() {
    if (!this.selectedNode || this.selectedNode === this.root) return;

    const deleteNodeById = (parentNode: BinaryNode, nodeId: string): boolean => {
      if (parentNode && parentNode.children) {
        for (let i = 0; i < parentNode.children.length; i++) {
          const child = parentNode.children[i];
          if (child.data.id === nodeId) {
            parentNode.children.splice(i, 1);
            return true;
          }
          if (deleteNodeById(child, nodeId)) {
            return true;
          }
        }
      }
      return false;
    };

    deleteNodeById(this.root, this.selectedNode.data.id);

    this.saveChanges();
  }

  generateTree() {
    this.treeService.generateBinaryTree({ depth: this.depth }).subscribe((res: any) => {
      const binaryNode = this.convertNodeToBinaryNode(res);
      if (binaryNode) {
        this.root = binaryNode;
      }
    })
  }

  startDragging(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX - this.translateX;
    this.startY = event.clientY - this.translateY;
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;

    event.preventDefault();
    this.translateX = event.clientX - this.startX;
    this.translateY = event.clientY - this.startY;
  }

  stopDragging() {
    this.isDragging = false;
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();

    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newScale = Math.max(0.5, Math.min(2, this.scale * delta));

    const scaleChange = newScale - this.scale;
    this.translateX -= (x - this.translateX) * (scaleChange / this.scale);
    this.translateY -= (y - this.translateY) * (scaleChange / this.scale);

    this.scale = newScale;
  }

  zoomIn() {
    this.scale = Math.min(2, this.scale * 1.1);
  }

  zoomOut() {
    this.scale = Math.max(0.5, this.scale * 0.9);
  }

  centerInScroll() {
    const container = this.containerRef.nativeElement;
    const rect = container.getBoundingClientRect();


    const centerX = (rect.width / 2) / this.scale;
    const centerY = (rect.height / 2) / this.scale;


    this.translateX = centerX - (container.offsetWidth / 2) / this.scale;
    this.translateY = centerY - (container.offsetHeight / 2) / this.scale;
  }

  goBack() {
    this.location.back();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'd') {
      event.preventDefault();
      this.resetTree();
    }

    if (event.ctrlKey && event.key === 'r') {
      event.preventDefault();
      this.goBack();
    }

    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      this.goBack();
    }

  }

}