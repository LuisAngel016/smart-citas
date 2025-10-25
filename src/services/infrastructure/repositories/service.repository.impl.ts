import { ServiceMapper } from "../mappers/service.mapper";
import type { ServicesApiResponse } from "../dto/response/services-api.response";
import type { ServiceAPIResponse } from "../dto/response/service-api.response";
import type { IServiceRepository } from "@/services/domain/repositories/service.repository";
import type { ServicePage } from "@/services/domain/interfaces/service-page.interface";
import type { Service } from "@/services/domain/entities/service.entity";
import type { IHttpClient } from "@/shared/api/interfaces/http-client.interface";

export class ServiceRepositoryImpl implements IServiceRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(): Promise<ServicePage> {
    const { data } = await this.httpClient.get<ServicesApiResponse>("/services");
    const services = ServiceMapper.toDomain(data);
    return services;
  }

  async getById(id: string): Promise<Service> {
    const { data } = await this.httpClient.get<ServiceAPIResponse>(`/services/${id}`);
    const service = ServiceMapper.toDomainSingle(data);
    return service;
  }

  async create(serviceData: Omit<Service, "id">): Promise<Service> {
    const { data } = await this.httpClient.post<ServiceAPIResponse>("/services", serviceData);
    const service = ServiceMapper.toDomainSingle(data);
    console.log(service)
    return service;
  }

  async update(id: string, serviceData: Partial<Omit<Service, "id">>): Promise<Service> {
    const { data } = await this.httpClient.put<ServiceAPIResponse>(`/services/${id}`, serviceData);
    const service = ServiceMapper.toDomainSingle(data);
    return service;
  }

  async delete(id: string): Promise<boolean> {
    await this.httpClient.delete(`/services/${id}`);
    return true;
  }
}
