import type { Client } from "@/clients/domain/domain/entities/client.entity";
import type { IClientRepository } from "@/clients/domain/domain/repositories/client.repository";
import type { IHttpClient } from "@/shared/api/interfaces/http-client.interface";

export class ClientRepositoryImpl implements IClientRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(): Promise<Client[]> {
    const { data } = await this.httpClient.get<Client[]>("/clients");
    return data;
  }

  async getById(id: string): Promise<Client> {
    const { data } = await this.httpClient.get<Client>(`/clients/${id}`);
    return data;
  }

  async create(clientData: Omit<Client, "id">): Promise<Client> {
    const { data } = await this.httpClient.post<Client>("/clients", clientData);
    return data;
  }

  async update(id: string, clientData: Partial<Omit<Client, "id">>): Promise<Client> {
    const { data } = await this.httpClient.put<Client>(`/clients/${id}`, clientData);
    return data;
  }

  async delete(id: string): Promise<boolean> {
    await this.httpClient.delete(`/clients/${id}`);
    return true;
  }
}
