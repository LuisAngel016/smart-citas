import type { UserAPIResponse } from "./user-api.response";

export interface AuthAPIResponse {
    user:  UserAPIResponse;
    token: string;
}