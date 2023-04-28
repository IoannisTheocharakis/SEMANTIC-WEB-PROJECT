export interface IDatabase {
  id?: number;
  title?: string;
  endpoint?: string;
  triples?: number;
  colour: string;
  entities?: number;
  properties?: number;
  classes?: number;
  cidocProperties?: number;
  triplesWithCIDOCinstance?: number;
  triplesWithCIDOCpropertyPercentage?: number;
  triplesWithCIDOCinstancePercentage?: number;
}
