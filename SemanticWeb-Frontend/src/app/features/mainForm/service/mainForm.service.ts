import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DatasetForm, RequestEmail } from "../model/mainForm.model";

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: "root",
})
export class MainFormService {
  constructor(private http: HttpClient, private router: Router) {}

  addDataset(request: RequestEmail) {
    return this.http.post(`${BASE_URL}add/dataset`, request);
  }
}
