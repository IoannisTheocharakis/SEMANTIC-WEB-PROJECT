import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PropertiesRequest, Property } from "../models/dataset-details.model";

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: "root",
})
export class DatabaseDetailsService {
  constructor(private http: HttpClient) {}

  requestDatasetProperties(req: PropertiesRequest) {
    return this.http.post<Property[]>(`${BASE_URL}dataset/properties`, req);
  }
}
