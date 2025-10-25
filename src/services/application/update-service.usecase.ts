import type { Service } from "../domain/entities/service.entity";
import type { IServiceRepository } from "../domain/repositories/service.repository";

export class UpdateServiceUseCase {
  constructor(private repository: IServiceRepository) {}

  async execute(id: string, data: Partial<Omit<Service, "id">>): Promise<Service> {
    return await this.repository.update(id, data);
  }
}
