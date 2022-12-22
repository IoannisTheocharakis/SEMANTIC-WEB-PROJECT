import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DatasetForm } from "../model/mainForm.model";

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: "root",
})
export class MainFormService {
  constructor(private http: HttpClient, private router: Router) {}

  requestDatasets() {
    return this.http.get<DatasetForm[]>(`${BASE_URL}datasets`);
  }
  addDataset() {
    return this.http.get<DatasetForm[]>(`${BASE_URL}newDataset`);
  }
  sparqlMainRequest() {
    return this.http.get<DatasetForm[]>(`${BASE_URL}url`);
  }
}
