import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hierarchy',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './hierarchy.component.html',
  styleUrl: './hierarchy.component.scss'
})
export class HierarchyComponent {

  heirarchyData = input([] as any[]);

  getSpaces(level: number): string {
    return '  '.repeat(level);
  }

  getDash(level: number): string {
    return level > 0 ? '-' : ' ';
  }
}
