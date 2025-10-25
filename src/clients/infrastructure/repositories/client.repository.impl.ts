import type { Client } from "@/clients/domain/domain/entities/client.entity";
import type { ClientPage } from "@/clients/domain/domain/interfaces/client-page.interface";
import type { IClientRepository } from "@/clients/domain/domain/repositories/client.repository";
import type { IHttpClient } from "@/shared/api/interfaces/http-client.interface";
import { ClientMapper } from "../mappers/client.mapper";
import type { ClientsApiResponse } from "../dto/response/clients-api.response";
import type { ClientAPIResponse } from "../dto/response/client-api.response";

export class ClientRepositoryImpl implements IClientRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(): Promise<ClientPage> {
    const { data } = await this.httpClient.get<ClientsApiResponse>("/clients");
    const clients = ClientMapper.toDomain(data);
    return clients;
  }

  async getById(id: string): Promise<Client> {
    const { data } = await this.httpClient.get<ClientAPIResponse>(`/clients/${id}`);
    const client = ClientMapper.toDomainSingle(data);
    return client;
  }

  async create(clientData: Omit<Client, "id">): Promise<Client> {
    console.log(clientData)
    const { data } = await this.httpClient.post<ClientAPIResponse>("/clients", clientData);
    const client = ClientMapper.toDomainSingle(data);
    console.log(client)
    return client;
  }

  async update(id: string, clientData: Partial<Omit<Client, "id">>): Promise<Client> {
    const { data } = await this.httpClient.put<ClientAPIResponse>(`/clients/${id}`, clientData);
    const client = ClientMapper.toDomainSingle(data);
    return client;
  }

  async delete(id: string): Promise<boolean> {
    await this.httpClient.delete(`/clients/${id}`);
    return true;
  }
}
