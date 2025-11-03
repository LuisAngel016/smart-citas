import type { UserAPIResponse } from "@/users/infrastructure/dto/response/user-api.response";

export interface AuthAPIResponse {
    user:  UserAPIResponse;
    token: string;
}