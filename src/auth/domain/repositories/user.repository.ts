import { User } from "../entities/user.entity";

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  create(data: Omit<User, "id">): Promise<User>;
  update(id: string, data: Partial<Omit<User, "id">>): Promise<User>;
  delete(id: string): Promise<boolean>;
}