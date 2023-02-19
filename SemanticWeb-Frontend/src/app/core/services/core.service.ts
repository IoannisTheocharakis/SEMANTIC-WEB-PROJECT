import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Dataset } from "../models/dataset.model";
import { BehaviorSubject } from "rxjs";

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: "root",
})
export class CoreService {
  private datasetsSubject$: BehaviorSubject<Dataset[]> = new BehaviorSubject([]);
  datasets$ = this.datasetsSubject$.asObservable();
  constructor(private http: HttpClient) {
    if (localStorage.getItem("Datasets")) {
      let datasetslocalStorage = JSON.parse(localStorage.getItem("Datasets"));
      this.datasetsSubject$.next(datasetslocalStorage);
    } else {
      this.datasetsSubject$.next([]);
    }
  }

  requestDatasets() {
    return this.http.get<Dataset[]>(`${BASE_URL}datasets`);
  }

  localStorageDatasets() {
    return localStorage.getItem("Datasets");
  }

  setDatasets(datasets: Dataset[]) {
    datasets.shift();
    localStorage.setItem("Datasets", JSON.stringify(datasets));
    this.datasetsSubject$.next(datasets);
  }

  clearDatasets() {
    localStorage.removeItem("Datasets");
    this.datasetsSubject$.next([]);
  }
}
