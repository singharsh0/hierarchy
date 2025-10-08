import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HierarchyComponent } from "../components/hierarchy/hierarchy.component";
import { HierarchyService } from '../services/hierarchy.service';

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
  hierarchyService = inject(HierarchyService);

  ngOnInit(): void {
    this.hierarchyData = this.hierarchyService.generateHierarchyTree(this.tree);
  }
}


