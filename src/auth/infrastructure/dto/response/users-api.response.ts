import type { UserAPIResponse } from "./user-api.response";

export interface UsersApiResponse {
  results: UserAPIResponse[];
  total: number;
}
