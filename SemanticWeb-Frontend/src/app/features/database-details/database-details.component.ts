import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from "@angular/core";
import { InfoCardComponent } from "src/app/shared/standalone-components/info-card/info-card.component";
import { AppColors } from "src/assets/app-colors";
import { TabMenuComponent } from "src/app/shared/standalone-components/tab-menu/tab-menu.component";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { CoreService } from "src/app/core/services/core.service";
import { LoaderService } from "src/app/loader/loader.service";
import { Dataset } from "src/app/core/models/dataset.model";
import { DatabaseDetailsService } from "./services/database-details.service";
import { CommonModule } from "@angular/common";
import { DatabaseBasicStatisticsComponent } from "./database-basicStatistics/database-basicStatistics.component";

@Component({
  standalone: true,
  imports: [
    InfoCardComponent,
    DatabaseBasicStatisticsComponent,
    TabMenuComponent,
    RouterOutlet,
    CommonModule,
  ],
  selector: "app-database-details",
  templateUrl: "./database-details.component.html",
  styleUrls: ["./database-details.component.scss"],
})
export class DatabaseDetailsComponent implements OnInit {
  localStorage: Storage = window.localStorage;
  subscriptions: Subscription = new Subscription();
  color = AppColors.white;
  backgroundColorDark = AppColors.greenMain;
  backgroundColorLight = AppColors.greenMainLight;
  datasetID: number;
  databaseDetails$: BehaviorSubject<Dataset> = new BehaviorSubject(null);
  databaseDetails: Dataset;
  constructor(
    private coreService: CoreService,
    private databaseDetailsService: DatabaseDetailsService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.datasetID = +this.route.snapshot.params["id"];
  }
  tab = [
    {
      label: "Properties",
      title: "Properties",
      path: "./properties",
      symbol: "open_with",
    },
    {
      label: "Cidoc Properties",
      title: "Cidoc Properties",
      path: "./properties/cidoc",
      symbol: "group_work",
    },
    {
      label: "Classes",
      title: "Classes",
      path: "./classes",
      symbol: "tenancy",
    },
    {
      label: "Cidoc Classes",
      title: "Cidoc Classes",
      path: "./classes/cidoc",
      symbol: "group_work",
    },
  ];

  ngOnInit() {
    this.getDataset();
    this.setDatasetDetails();
  }
  getDataset() {
    this.databaseDetailsService.setDataset(this.datasetID);
    this.databaseDetailsService.databaseDetails$.subscribe((data) => {
      if (data) {
        this.databaseDetails$.next(data);
      }
    });
  }
  setDatasetDetails() {
    this.subscriptions.add(
      this.databaseDetails$.subscribe((data) => {
        if (data) {
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
