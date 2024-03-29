import { Component, OnInit } from "@angular/core";
import { ThemeServiceService } from "./core/services/themeService.service";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription, filter, startWith } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss", "./dark-theme.scss", "./light-theme.scss"],
})
export class AppComponent implements OnInit {
  title = "SemanticWeb";
  themeColor: string;

  constructor(public themeService: ThemeServiceService) {
    this.watchDataset();
  }
  ngOnInit(): void {
  }
  watchDataset() {
    const datasetTimestamp = localStorage.getItem("dataset-timestamp");

    if (datasetTimestamp) {
      const twoDaysAgo = new Date().getTime() - 2 * 24 * 60 * 60 * 1000;

      if (Number(datasetTimestamp) < twoDaysAgo) {
        localStorage.removeItem("Datasets");
        window.location.reload();
      }
    }

    // Set the current timestamp for the dataset
    localStorage.setItem("dataset-timestamp", new Date().getTime().toString());
  }

  ngOnDestroy(): void {
  }
}
