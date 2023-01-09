import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";

export interface Tab {
  label: string;
  title: string;
  path?: string;
  icon?: string;
}
@Component({
  standalone: true,
  imports: [MatIconModule, RouterModule, CommonModule, MatTabsModule],
  selector: "app-tab-menu",
  templateUrl: "./tab-menu.component.html",
  styleUrls: ["./tab-menu.component.scss"],
})
export class TabMenuComponent implements OnInit {
  @Input() tabs: Tab[];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  async checkPath(path) {
    await console.log(path);
    console.log(this.router.url);
  }
}
