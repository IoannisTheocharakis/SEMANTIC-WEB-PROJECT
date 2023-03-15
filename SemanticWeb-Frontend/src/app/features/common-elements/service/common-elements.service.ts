import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  CommonElementsRequest,
  CommonProperties,
  CommonRDFClasses,
} from "../models/common-elements.model";

const BASE_URL = "http://localhost:8080/dataset/";

@Injectable({
  providedIn: "root",
})
export class CommonElementsService {
  private commonPropertiesRequestSubject$: BehaviorSubject<CommonElementsRequest> =
    new BehaviorSubject(null);
  commonPropertiesRequest$ = this.commonPropertiesRequestSubject$.asObservable();

  private commonRDFClassesRequestSubject$: BehaviorSubject<CommonElementsRequest> =
    new BehaviorSubject(null);
  commonRDFClassesRequest$ = this.commonRDFClassesRequestSubject$.asObservable();

  constructor(private http: HttpClient) {}
  requestCommonProperties(req: CommonElementsRequest) {
    return this.http.post<CommonProperties[]>(`${BASE_URL}commonProperties`, req);
  }
  requestCommonRDFClasses(req: CommonElementsRequest) {
    return this.http.post<CommonRDFClasses[]>(`${BASE_URL}commonClasses`, req);
  }
  setPropertiesRequest(req: CommonElementsRequest) {
    console.log(req);
    this.commonPropertiesRequestSubject$.next(req);
  }
  setRDFClassesRequest(req: CommonElementsRequest) {
    console.log(req);
    this.commonRDFClassesRequestSubject$.next(req);
  }
}
