import type { Service } from "../domain/entities/service.entity";
import type { IServiceRepository } from "../domain/repositories/service.repository";


export class GetServiceByIdUseCase {
  constructor(private repository: IServiceRepository) {}

  async execute(id: string): Promise<Service> {
    return await this.repository.getById(id);
  }
}
