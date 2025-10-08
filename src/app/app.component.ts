import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HierarchyComponent } from "../components/hierarchy/hierarchy.component";

@Component({
  selector: 'app-root',
  imports: [HierarchyComponent],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  tree: { [key: string]: string[] } = {
    "a": ["b", "c"],
    "b": ["d", "e"],
    "c": ["f", "g"],
    "e": ["h", "i"],
    "f": ["j", "k"]
  };
  hierarchyData: any[] = [];

  ngOnInit(): void {
    this.generateHierarchyTree(this.tree);
    console.log(this.hierarchyData, 'hierarchyData')
  }

  generateHierarchyTree(configData: { [key: string]: string[] }) {
    let rootNodes: string[] = [];
    rootNodes = this.findRootNodes(configData);

    rootNodes.forEach(rootNode => {
      const nodeData = this.generateNodeData(rootNode, configData);
      nodeData.isRoot = true;
      this.hierarchyData.push(nodeData);
    });
  }

  generateNodeData(key: string, configData: any) {
    let nodeData = {
      isRoot: false,
      childrens: [] as any[],
      label: key,
      isLeaf: false
    }

    const children = configData[key];
    if (children && children.length > 0) {
      children.forEach((childKey: string) => {
        if (configData[childKey]) {
          const childNode = this.generateNodeData(childKey, configData);
          nodeData.childrens.push(childNode);
        } else {
          nodeData.childrens.push({
            label: childKey,
            isLeaf: true,
            childrens: []
          });
        }
      });
    } else {
      nodeData.isLeaf = true;
    }

    return nodeData;
  }

  findRootNodes(configData: { [key: string]: string[] }): string[] {
    const rootNodes: string[] = [];
    Object.keys(configData).forEach(key => {
      let isRoot = true;
      for (const parent in configData) {
        if (configData[parent].includes(key)) {
          isRoot = false;
          break;
        }
      }

      if (isRoot) {
        rootNodes.push(key);
      }
    });

    return rootNodes;
  }
}


