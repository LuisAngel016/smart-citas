import { Client } from "../entities/client.entity";
import type { ClientPage } from "../interfaces/client-page.interface";

export interface IClientRepository {
  getAll(): Promise<ClientPage>;
  getById(id: string): Promise<Client>;
  create(data: Omit<Client, "id">): Promise<Client>;
  update(id: string, data: Partial<Omit<Client, "id">>): Promise<Client>;
  delete(id: string): Promise<boolean>;
}