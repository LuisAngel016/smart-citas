import type { Service } from "../entities/service.entity";
import type { ServicePage } from "../interfaces/service-page.interface";

export interface IServiceRepository {
  getAll(): Promise<ServicePage>;
  getById(id: string): Promise<Service>;
  create(data: Omit<Service, "id">): Promise<Service>;
  update(id: string, data: Partial<Omit<Service, "id">>): Promise<Service>;
  delete(id: string): Promise<boolean>;
}