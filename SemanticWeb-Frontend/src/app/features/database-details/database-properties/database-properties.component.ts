import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MaterialFormModule } from "src/app/shared/material-form.module";
import { MaterialMinModule } from "src/app/shared/material-min.module";
import { LoaderService } from "src/app/loader/loader.service";
import { PropertiesRequest } from "../models/dataset-details.model";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  imports: [MaterialMinModule, MaterialFormModule],
  selector: "app-database-properties",
  templateUrl: "./database-properties.component.html",
  styleUrls: ["./database-properties.component.scss"],
})
export class DatabasePropertiesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  myPaginator!: MatPaginator;
  propertiesRequest$: Observable<PropertiesRequest>;
  propertiesRequest: PropertiesRequest;
  error$: Observable<string | undefined>;
  displayError$: Observable<boolean>;
  pagging$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  subscriptions: Subscription = new Subscription();
  dataSource!: MatTableDataSource<any>;
  columnsToDisplay = ["id", "property", "triples"];
  constructor(public loaderService: LoaderService, private router: Router) {
    
  }

  ngOnInit() {
    // this.subscriptions.add(
    //   this.portsRequest$.subscribe((data) => {
    //     if (data) {
    //       this.portsRequest = JSON.parse(JSON.stringify(data));
    //     } else {
    //       this.portsRequest = {};
    //     }
    //   })
    // );
    // this.portsRequest.limit =
    //   this.portsRequest.limit === undefined ? 10 : this.portsRequest.limit;
    // this.portsRequest.page =
    //   this.portsRequest.page === undefined ? 1 : this.portsRequest.page;
    // this.store.dispatch(
    //   PortsActions.getPorts({
    //     portsRequest:this.portsRequest
    //   })
    // );
    // setTimeout(() => {
    //   this.subscriptions.add(
    //     this.pagging$.subscribe((pagging) => {
    //       this.pagging = pagging;
    //     })
    //   );
    // });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      // this.myPaginator = this.paginator;
      // this.pagging != undefined ? this.pagging.currentPage - 1 : 0;
      // this.subscriptions.add(
      //   this.ports$.subscribe((data) => {
      //     if (data != null) {
      //       this.dataSource = new MatTableDataSource(data);
      //       this.dataSource.sort = this.sort;
      //     }
      //   })
      // );
      // this.subscriptions.add(
      //   this.myPaginator.page.subscribe((data) => {
      //     var pageNumber = data.pageIndex + 1;
      //     setTimeout(() => {
      //       //if change page size then go back to first page
      //       if (
      //         this.pagging &&
      //         this.pagging.entriesPerPage != this.myPaginator.pageSize
      //       ) {
      //         this.portsRequest.page = 1;
      //         this.paginator.pageIndex = 0;
      //       } else {
      //         this.portsRequest.page = pageNumber;
      //       }
      //       this.portsRequest.limit = this.myPaginator.pageSize;
      //       this.store.dispatch(
      //         PortsActions.getPorts({
      //           portsRequest: this.portsRequest,
      //         })
      //       );
      //     });
      //   })
      // );
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
