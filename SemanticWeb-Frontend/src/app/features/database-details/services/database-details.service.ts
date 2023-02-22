import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PropertiesRequest, Property, RDFClass } from "../models/dataset-details.model";
import { Dataset } from "src/app/core/models/dataset.model";
import { BehaviorSubject, Subscription } from "rxjs";
import { CoreService } from "src/app/core/services/core.service";
import { Router } from "@angular/router";

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: "root",
})
export class DatabaseDetailsService {
  subscriptions: Subscription = new Subscription();

  private databaseDetailsSubject$: BehaviorSubject<Dataset> = new BehaviorSubject(null);
  databaseDetails$ = this.databaseDetailsSubject$.asObservable();

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private router: Router
  ) {}

  requestDatasetProperties(req: PropertiesRequest) {
    return this.http.post<Property[]>(`${BASE_URL}dataset/properties`, req);
  }
  requestDatasetRDFClasses(req: PropertiesRequest) {
    return this.http.post<RDFClass[]>(`${BASE_URL}dataset/rdfClasses`, req);
  }

  setDataset(datasetID: number) {
    this.subscriptions.add(
      this.coreService.datasets$.subscribe((data) => {
        if (data != null && data.length !== 0) {
          let found = false;
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === datasetID) {
              found = true;
              this.databaseDetailsSubject$.next(data[i]);
              break;
            }
          }
          if (!found) {
            this.router.navigate(["/databases"]);
          }
        }
      })
    );
  }
}
