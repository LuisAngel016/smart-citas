import { Client } from "../entities/client.entity";

export interface IClientRepository {
  getAll(): Promise<Client[]>;
  getById(id: string): Promise<Client>;
  create(data: Omit<Client, "id">): Promise<Client>;
  update(id: string, data: Partial<Omit<Client, "id">>): Promise<Client>;
  delete(id: string): Promise<boolean>;
}