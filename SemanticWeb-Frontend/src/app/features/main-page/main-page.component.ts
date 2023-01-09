import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from "@angular/core";
import { MaterialFormModule } from "src/app/shared/material-form.module";
import { MaterialMinModule } from "src/app/shared/material-min.module";
import { ChordDiagramComponent } from "../chord-diagram/components/chord-diagram/chord-diagram.component";
import { InfoCardComponent } from "src/app/shared/standalone-components/info-card/info-card.component";
import { AppColors } from "src/assets/app-colors";
import { IDatabase } from "../chord-diagram/interfaces/database.interface";
import { BehaviorSubject } from "rxjs";
import { TabMenuComponent } from "src/app/shared/standalone-components/tab-menu/tab-menu.component";
import { MainPageChartComponent } from "./main-page-chart/main-page-chart.component";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  imports: [MainPageChartComponent, InfoCardComponent, TabMenuComponent, RouterOutlet],
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {
  color = AppColors.white;
  backgroundColor = AppColors.greenMain;
  currentPath;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  tab = [
    {
      label: "Database Chart",
      title: "Database Chart",
      path: "/databases/chart",
      icon: "incomplete_circle",
    },
    {
      label: "Database Table",
      title: "Database Table",
      path: "/databases/table",
      icon: "table_chart",
    },
  ];
  ngOnInit() {
    this.currentPath = this.router.url;

    if (this.currentPath === "/")
      this.router.navigate(["./databases/chart"], { relativeTo: this.route });
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
