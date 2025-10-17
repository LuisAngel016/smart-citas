import type { ClientAPIResponse } from "./client-api.response";

export interface ClientsApiResponse {
  results: ClientAPIResponse[];
  total: number;
}
