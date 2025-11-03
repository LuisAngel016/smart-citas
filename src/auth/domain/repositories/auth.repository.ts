import type { Session } from "../interfaces/session.interface";

export interface IAuthRepository {
  startLogin(email: string, password: string): Promise<Session>;
  startRegister(email: string, password: string, fullName: string): Promise<Session>;
  checkAuthStatus(): Promise<Session>;
}