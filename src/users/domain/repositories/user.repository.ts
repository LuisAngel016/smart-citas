import { User } from "@/auth/domain/entities/user.entity";
import type { UpdateUserFormDTO } from "../interfaces/update-user-form.dto";

export interface IUserRepository {
  // getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  update(id: string, data: UpdateUserFormDTO): Promise<User>;
  delete(id: string): Promise<boolean>;
}