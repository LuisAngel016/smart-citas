import type { User } from "@/auth/domain/entities/user.entity";
import type { IUserRepository } from "@/auth/domain/repositories/user.repository";
import type { IHttpClient } from "@/shared/api/interfaces/http-client.interface";

export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(): Promise<User[]> {
    const { data } = await this.httpClient.get<User[]>("/users");
    return data;
  }

  async getById(id: string): Promise<User> {
    const { data } = await this.httpClient.get<User>(`/users/${id}`);
    return data;
  }

  async create(userData: Omit<User, "id">): Promise<User> {
    const { data } = await this.httpClient.post<User>("/users", userData);
    return data;
  }

  async update(id: string, userData: Partial<Omit<User, "id">>): Promise<User> {
    const { data } = await this.httpClient.put<User>(`/users/${id}`, userData);
    return data;
  }

  async delete(id: string): Promise<boolean> {
    await this.httpClient.delete(`/users/${id}`);
    return true;
  }
}
