export interface Property {
  id: number;
  prop: string;
  triples: number;
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
