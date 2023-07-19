import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { InfoCardComponent } from "src/app/shared/standalone-components/info-card/info-card.component";
import { TabMenuComponent } from "src/app/shared/standalone-components/tab-menu/tab-menu.component";
import { BehaviorSubject, Subscription } from "rxjs";
import { AppColors } from "src/assets/app-colors";
import { MostFrequentService } from "../services/most-frequent.service";

@Component({
  standalone: true,
  imports: [InfoCardComponent, TabMenuComponent, RouterOutlet, CommonModule],
  selector: "app-most-frequent",
  templateUrl: "./most-frequent.component.html",
  styleUrls: ["./most-frequent.component.scss"],
})
export class MostFrequentComponent implements OnInit {
  localStorage: Storage = window.localStorage;
  // subscriptions: Subscription = new Subscription();
  color = AppColors.white;
  backgroundColorDark = AppColors.greenMain;
  backgroundColorLight = AppColors.greenMainLight;
  tab = [
    {
      label: "Properties",
      title: "Properties",
      path: "./properties",
    },
    {
      label: "CIDOC-CRM Properties",
      title: "CIDOC-CRM Properties",
      path: "./properties/cidoc-crm",
    },
    {
      label: "Properties Instances",
      title: "Properties Instances",
      path: "./properties/instances",
    },
    {
      label: "CIDOC-CRM Properties Instances",
      title: "CIDOC-CRM Properties Instances",
      path: "./properties/cidoc-crm/instances",
    },
    {
      label: "Classes",
      title: "Classes",
      path: "./classes",
    },
    {
      label: "CIDOC-CRM Classes",
      title: "CIDOC-CRM Classes",
      path: "./classes/cidoc-crm",
    },
    {
      label: "Classes Instances",
      title: "Classes Instances",
      path: "./classes/instances",
    },
    {
      label: "CIDOC-CRM Classes Instances",
      title: "CIDOC-CRM Classes Instances",
      path: "./classes/cidoc-crm/instances",
    },
  ];
  constructor(private mostFrequentService: MostFrequentService) {}

  ngOnInit() {}
}
