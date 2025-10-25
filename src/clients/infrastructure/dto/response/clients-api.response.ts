import type { ClientAPIResponse } from "./client-api.response";

export interface ClientsApiResponse {
  data: ClientAPIResponse[];
  total: number;
}

