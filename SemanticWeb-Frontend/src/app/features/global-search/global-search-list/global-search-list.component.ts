import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MaterialFormModule } from "src/app/shared/material-form.module";
import { MaterialMinModule } from "src/app/shared/material-min.module";
import { LoaderService } from "src/app/loader/loader.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreService } from "src/app/core/services/core.service";
import { Dataset } from "src/app/core/models/dataset.model";
import { GlobalSearchRequest, GlobalSearchResponse } from "../model/global-search.model";
import { GlobalSearchService } from "../service/global-search.service";

@Component({
  standalone: true,
  imports: [MaterialMinModule, MaterialFormModule],
  selector: "app-global-search-list",
  templateUrl: "./global-search-list.component.html",
  styleUrls: ["./global-search-list.component.scss"],
})
export class GlobalSearchListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  myPaginator!: MatPaginator;
  globalSearchRequest$: BehaviorSubject<GlobalSearchRequest> = new BehaviorSubject(null);
  globalSearchRequest: GlobalSearchRequest;
  globalSearchResponse$: BehaviorSubject<GlobalSearchResponse[]> = new BehaviorSubject(
    null
  );
  globalSearchResponse: GlobalSearchResponse;
  error$: Observable<string | undefined>;
  displayError$: Observable<boolean>;
  subscriptions: Subscription = new Subscription();
  dataSource!: MatTableDataSource<any>;
  columnsToDisplay = ["dataset", "triples"];
  databaseDetails$: BehaviorSubject<Dataset> = new BehaviorSubject(null);
  databaseDetails: Dataset;
  constructor(
    private coreService: CoreService,
    public loaderService: LoaderService,
    private globalSearchService: GlobalSearchService
  ) {}

  ngOnInit() {
    this.setRequest();
    this.requestRDFClasses();
  }
  setRequest() {
    this.subscriptions.add(
      this.globalSearchService.globalSearchRequest$.subscribe((data) => {
        if (data) {
          this.globalSearchRequest = data;
          this.globalSearchRequest$.next(this.globalSearchRequest);
        }
      })
    );
  }
  requestRDFClasses() {
    this.subscriptions.add(
      this.globalSearchRequest$.subscribe((data1) => {
        this.subscriptions.add(
          this.globalSearchService
            .globalSearchRequest(this.globalSearchRequest)
            .subscribe((data) => {
              if (data) {
                this.globalSearchResponse$.next(data);
                if (this.globalSearchRequest.totalEntries === 0) {
                  this.globalSearchRequest.totalEntries = data[0].requestSize;
                }
              }
            })
        );
      })
    );
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.myPaginator = this.paginator;
      this.subscriptions.add(
        this.globalSearchResponse$.subscribe((data) => {
          if (data != null) {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
          }
        })
      );
      this.subscriptions.add(
        this.myPaginator.page.subscribe((data) => {
          var pageNumber = data.pageIndex;
          setTimeout(() => {
            //if change page size then go back to first page
            if (
              this.globalSearchRequest &&
              this.globalSearchRequest.limit != this.myPaginator.pageSize
            ) {
              this.globalSearchRequest.page = 0;
              this.paginator.pageIndex = 0;
            } else {
              this.globalSearchRequest.page = pageNumber;
            }
            this.globalSearchRequest.limit = this.myPaginator.pageSize;
            this.globalSearchRequest$.next(this.globalSearchRequest);
          });
        })
      );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
