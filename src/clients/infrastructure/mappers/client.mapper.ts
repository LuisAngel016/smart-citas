import type { Client } from "@/clients/domain/domain/entities/client.entity";
import type { ClientPage } from "@/clients/domain/domain/interfaces/client-page.interface";
import type { ClientAPIResponse } from "../dto/response/client-api.response";
import type { ClientsApiResponse } from "../dto/response/clients-api.response";

export class ClientMapper {
  static toDomain(clients: ClientsApiResponse): ClientPage {
    const data: Client[] = clients.data.map(result => ({
      id: result.id,
      name: result.name,
      phone: result.telefono,
      email: result.email,
      address: result.address ?? '',
      identification: result.identification,
      createdAt: new Date(result.createdAt),
      updatedAt: result.updatedAt ? new Date(result.updatedAt) : undefined,
    }));
    
    return {
      data,
      total: clients.total,
    };
  }
  
  static toDomainSingle(result: ClientAPIResponse): Client {
    return {
      id: result.id,
      name: result.name,
      phone: result.telefono,
      email: result.email,
      address: result.address ?? '',
      identification: result.identification,
      createdAt: new Date(result.createdAt),
      updatedAt: result.updatedAt ? new Date(result.updatedAt) : undefined,
    };
  }
}
