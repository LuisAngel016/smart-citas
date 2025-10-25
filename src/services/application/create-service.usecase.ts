import type { Service } from "../domain/entities/service.entity";
import type { IServiceRepository } from "../domain/repositories/service.repository";

export class CreateServiceUseCase {
  constructor(private repository: IServiceRepository) {}

  async execute(data: Omit<Service, "id">): Promise<Service> {
    return await this.repository.create(data);
  }
}
