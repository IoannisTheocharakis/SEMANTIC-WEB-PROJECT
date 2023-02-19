import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from "@angular/core";
import { InfoCardComponent } from "src/app/shared/standalone-components/info-card/info-card.component";
import { AppColors } from "src/assets/app-colors";
import { TabMenuComponent } from "src/app/shared/standalone-components/tab-menu/tab-menu.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { CoreService } from "src/app/core/services/core.service";
import { LoaderService } from "src/app/loader/loader.service";
import { Dataset } from "src/app/core/models/dataset.model";
import { DatabaseDetailsService } from "./services/database-details.service";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  imports: [InfoCardComponent, TabMenuComponent, RouterOutlet, CommonModule],
  selector: "app-database-details",
  templateUrl: "./database-details.component.html",
  styleUrls: ["./database-details.component.scss"],
})
export class DatabaseDetailsComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  color = AppColors.white;
  backgroundColor = AppColors.greenMain;
  datasetTitle: string;
  databaseDetails$: BehaviorSubject<Dataset> = new BehaviorSubject(null);
  databaseDetails: Dataset;
  constructor(
    private coreService: CoreService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private databaseDetailsServices: DatabaseDetailsService
  ) {
    this.datasetTitle = this.route.snapshot.params["title"];
  }
  tab = [
    {
      label: "Properties",
      title: "Properties",
      path: "./properties",
      symbol: "open_with",
    },
    {
      label: "Classes",
      title: "Classes",
      path: "./classes",
      symbol: "tenancy",
    },
  ];
  ngOnInit() {
    // this.getDatasets();
    // this.setDatasetDetails();
    let temp = {
      limit: 10,
      page: 1,
      endpoint: "http://ldf.fi/ww1lod/sparql",
      onlyCidoc: false,
    };
    // this.subscriptions.add(
    //   this.databaseDetailsServices.requestDatasetProperties(temp).subscribe((data) => {
    //     console.log(1);
    //   })
    // );
  }
  getDatasets() {
    this.subscriptions.add(
      this.coreService.datasets$.subscribe((data) => {
        if (data != null && data.length !== 0) {
          let found = false;
          for (let i = 0; i < data.length; i++) {
            if (data[i].title === this.datasetTitle) {
              found = true;
              this.databaseDetails$.next(data[i]);
              break;
            }
          }
          if (!found) {
            this.router.navigate(["/databases"]);
            this.databaseDetails$.next(null);
          }
        }
      })
    );
  }
  setDatasetDetails() {
    this.subscriptions.add(
      this.databaseDetails$.subscribe((data) => {
        if (data) {
          this.databaseDetails = data;
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
