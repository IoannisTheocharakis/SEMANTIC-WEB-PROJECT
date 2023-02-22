export interface Property {
  id: number;
  prop: string;
  triples: number;
  requestSize: number;
  url: string;
  distinctSubjects: number;
  distinctObjects: number;
}
export interface PropertiesRequest {
  endpoint: string;
  onlyCidoc: boolean;
  limit: number;
  page: number;
}
//classes
export interface RequestRDFClasses {
  endpoint: string;
  onlyCidoc: boolean;
  limit: number;
  page: number;
}
export interface RDFClass {
  id: number;
  url: string;
  triples: number;
  requestSize: number;
}
