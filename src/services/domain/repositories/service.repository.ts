import type { Service } from "../entities/service.entity";
import type { CreateServiceDTO, UpdateServiceDTO } from "../interfaces/create-service.dto";
import type { ServicePage } from "../interfaces/service-page.interface";

export interface IServiceRepository {
  getAll(): Promise<ServicePage>;
  getById(id: string): Promise<Service>;
  create(data: CreateServiceDTO): Promise<Service>;
  update(id: string, data: UpdateServiceDTO): Promise<Service>;
  delete(id: string): Promise<boolean>;
}