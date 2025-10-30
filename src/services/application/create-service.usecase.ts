import type { IServiceRepository } from "../domain/repositories/service.repository";
import type { CreateServiceDTO } from "../domain/interfaces/create-service.dto";
import type { Service } from "../domain/entities/service.entity";

export class CreateServiceUseCase {
  constructor(private repository: IServiceRepository) {}

  async execute(data: CreateServiceDTO): Promise<Service> {
    return await this.repository.create(data);
  }
}
