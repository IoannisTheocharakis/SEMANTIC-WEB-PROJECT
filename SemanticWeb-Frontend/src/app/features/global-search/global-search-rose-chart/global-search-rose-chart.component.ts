import { Component, OnDestroy, OnInit } from "@angular/core";
import { RoseDiagramComponent } from "src/app/shared/standalone-components/rose-diagram/rose-diagram.component";
import { GlobalSearchRequest, GlobalSearchResponse } from "../model/global-search.model";
import { BarChartModel } from "src/app/core/models/charts.model";
import { BehaviorSubject, Subscription } from "rxjs";
import { Dataset } from "src/app/core/models/dataset.model";
import { LoaderService } from "src/app/loader/loader.service";
import { GlobalSearchService } from "../service/global-search.service";

@Component({
  standalone: true,
  imports: [RoseDiagramComponent],
  selector: "app-global-search-rose-chart",
  templateUrl: "./global-search-rose-chart.component.html",
  styleUrls: ["./global-search-rose-chart.component.scss"],
})
export class GlobalSearchRoseChartComponent implements OnInit, OnDestroy {
  globalSearchRequest$: BehaviorSubject<GlobalSearchRequest> = new BehaviorSubject(null);
  globalSearchRequest: GlobalSearchRequest;
  barChartModel$: BehaviorSubject<BarChartModel[]> = new BehaviorSubject([]);
  barChartModel: BarChartModel;
  subscriptions: Subscription = new Subscription();
  databaseDetails$: BehaviorSubject<Dataset> = new BehaviorSubject(null);
  databaseDetails: Dataset;
  constructor(
    public loaderService: LoaderService,
    private globalSearchService: GlobalSearchService
  ) {}

  ngOnInit() {
    this.setRequest();
    this.requestGlobalSearch();
  }

  setRequest() {
    this.subscriptions.add(
      this.globalSearchService.globalSearchRequest$.subscribe((data) => {
        if (data) {
          this.globalSearchRequest = data;
          this.globalSearchRequest = { ...this.globalSearchRequest, limit: 50, page: 0 };
          this.globalSearchRequest$.next(this.globalSearchRequest);
        }
      })
    );
  }

  requestGlobalSearch() {
    this.subscriptions.add(
      this.globalSearchRequest$.subscribe((data1) => {
        this.subscriptions.add(
          this.globalSearchService
            .globalSearchRequest(this.globalSearchRequest)
            .subscribe((data) => {
              if (data) {
                let chartData = this.fixChartData(data);
                this.barChartModel$.next(chartData);
              }
            })
        );
      })
    );
  }
  fixChartData(datas: GlobalSearchResponse[]): BarChartModel[] {
    let dataChartModel: BarChartModel[] = [];
    datas.forEach((data) => {
      let tmp: BarChartModel = {
        name: "",
        value: 0,
      };
      tmp.name = data.dataset;
      tmp.value = data.triples;
      dataChartModel.push(tmp);
    });
    return dataChartModel;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
