import type { Service } from "../entities/service.entity";

export interface IServiceRepository {
  getAll(): Promise<Service[]>;
  getById(id: string): Promise<Service>;
  create(data: Omit<Service, "id">): Promise<Service>;
  update(id: string, data: Partial<Omit<Service, "id">>): Promise<Service>;
  delete(id: string): Promise<boolean>;
}