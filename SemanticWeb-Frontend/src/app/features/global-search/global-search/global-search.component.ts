import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { GlobalSearchFormComponent } from "../global-search-form/global-search-form.component";
import { InfoCardComponent } from "src/app/shared/standalone-components/info-card/info-card.component";
import { AppColors } from "src/assets/app-colors";
import { GlobalSearchService } from "../service/global-search.service";
import { GlobalSearchListComponent } from "../global-search-list/global-search-list.component";
import { MatTabsModule } from "@angular/material/tabs";
import { BarChartComponent } from "src/app/shared/standalone-components/bar-chart/bar-chart.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    GlobalSearchFormComponent,
    InfoCardComponent,
    GlobalSearchListComponent,
    MatTabsModule,
    // BarChartComponent,
  ],
  selector: "app-global-search",
  templateUrl: "./global-search.component.html",
  styleUrls: ["./global-search.component.scss"],
})
export class GlobalSearchComponent implements OnInit {
  localStorage: Storage = window.localStorage;
  color = AppColors.white;
  backgroundColorDark = AppColors.greenMain;
  backgroundColorLight = AppColors.greenMainLight;

  constructor(public globalSearchService: GlobalSearchService) {}

  ngOnInit() {}
}
