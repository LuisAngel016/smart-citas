import { User } from "../entities/user.entity";
import type { Session } from "../interfaces/session.interface";

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  create(data: Omit<User, "id">): Promise<User>;
  update(id: string, data: Partial<Omit<User, "id">>): Promise<User>;
  delete(id: string): Promise<boolean>;
  startLogin(email: string, password: string): Promise<Session>;
  checkAuthStatus(): Promise<Session>;
}