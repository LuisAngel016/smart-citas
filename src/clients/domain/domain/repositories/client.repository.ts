import { Client } from "../entities/client.entity";
import type { ClientPage } from "../interfaces/client-page.interface";
import type { CreateClientDTO, UpdateClientDTO } from "../interfaces/create-client.dto";

export interface IClientRepository {
  getAll(): Promise<ClientPage>;
  getById(id: string): Promise<Client>;
  create(data: CreateClientDTO): Promise<Client>;
  update(id: string, data: UpdateClientDTO): Promise<Client>;
  delete(id: string): Promise<boolean>;
}