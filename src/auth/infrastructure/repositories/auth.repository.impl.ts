import type { IHttpClient } from "@/shared/api/interfaces/http-client.interface";
import { AuthMapper } from "../mappers/auth.mapper";
import type { Session } from "@/auth/domain/interfaces/session.interface";
import type { AuthAPIResponse } from "../dto/response/auth-api.response";
import type { IAuthRepository } from "@/auth/domain/repositories/auth.repository";

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly httpClient: IHttpClient) {}
  
  async startLogin(email: string, password: string): Promise<Session> {
    const { data } = await this.httpClient.post<AuthAPIResponse>("/auth/login", { email, password });
    const user = AuthMapper.toDomainSession(data);
    return user;
  }

  async startRegister(email: string, password: string, fullName: string): Promise<Session> {
    const { data } = await this.httpClient.post<AuthAPIResponse>("/auth/register", { email, password, fullName });
    const user = AuthMapper.toDomainSession(data);
    return user;
  }
  
  async checkAuthStatus(): Promise<Session> {
    const { data } = await this.httpClient.get<AuthAPIResponse>("/auth/check-status");
    const user = AuthMapper.toDomainSession(data);
    return user;
  }
}
