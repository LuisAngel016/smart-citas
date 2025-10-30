import type { IServiceRepository } from "../domain/repositories/service.repository";
import type { UpdateServiceDTO } from "../domain/interfaces/create-service.dto";
import type { Service } from "../domain/entities/service.entity";

export class UpdateServiceUseCase {
  constructor(private repository: IServiceRepository) {}

  async execute(id: string, data: UpdateServiceDTO): Promise<Service> {
    return await this.repository.update(id, data);
  }
}
