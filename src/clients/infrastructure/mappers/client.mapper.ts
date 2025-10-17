import type { Client } from "@/clients/domain/domain/entities/client.entity";
import type { ClientPage } from "@/clients/domain/domain/interfaces/client-page.interface";
import type { ClientAPIResponse } from "../dto/response/client-api.response";
import type { ClientsApiResponse } from "../dto/response/clients-api.response";

export class ClientMapper {
  static toDomain(appointments: ClientsApiResponse): ClientPage {
    const data: Client[] = appointments.results.map(result => ({
      id: result.id,
      nombre: result.client_name,
      telefono: result.client_phone,
      email: result.client_email,
      direccion: undefined,
      notas: result.notes,
      createdAt: new Date(result.created_at),
      updatedAt: result.updated_at ? new Date(result.updated_at) : undefined,
    }));
    
    return {
      data,
      total: appointments.total,
    };
  }
  
  static toDomainSingle(result: ClientAPIResponse): Client {
    return {
      id: result.id,
      nombre: result.client_name,
      telefono: result.client_phone,
      email: result.client_email,
      direccion: undefined,
      notas: result.notes,
      createdAt: new Date(result.created_at),
      updatedAt: result.updated_at ? new Date(result.updated_at) : undefined,
    };
  }
}
