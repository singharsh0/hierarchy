import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {

  generateHierarchyTree(configData: { [key: string]: string[] }) {
    let rootNodes: string[] = [];
    let hierarchyData:any[] = []
    rootNodes = this.findRootNodes(configData);

    rootNodes.forEach(rootNode => {
      const nodeData = this.generateNodeData(rootNode, configData);
      nodeData.isRoot = true;
      hierarchyData.push(nodeData);
    });
    return hierarchyData;
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
