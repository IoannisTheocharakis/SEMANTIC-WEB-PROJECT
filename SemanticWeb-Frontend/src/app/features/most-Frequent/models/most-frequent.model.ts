export interface MostFrequentRequest {
  title: string;
  limit: number;
  page: number;
  totalEntries: number;
}

export interface MostFrequentResponse {
  propORclass: string;
  triples: number;
  requestSize: number;
}
