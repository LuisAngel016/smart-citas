import type { Client } from "../domain/domain/entities/client.entity";
import type { IClientRepository } from "../domain/domain/repositories/client.repository";


export class GetClientByIdUseCase {
  constructor(private repository: IClientRepository) {}

  async execute(id: string): Promise<Client> {
    return await this.repository.getById(id);
  }
}
