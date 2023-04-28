export interface Dataset {
  id?: number;
  title: string;
  endpoint: string;
  triples: number;
  entities: number;
  properties: number;
  classes: number;
  cidocProperties: number;
  triplesWithCIDOCinstance: number;
  triplesWithCIDOCpropertyPercentage: number;
  triplesWithCIDOCinstancePercentage: number;
}
