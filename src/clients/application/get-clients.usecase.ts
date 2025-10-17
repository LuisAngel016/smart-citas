import type { Client } from "../domain/domain/entities/client.entity";
import type { IClientRepository } from "../domain/domain/repositories/client.repository";


export class GetClientsUseCase {
  constructor(private repository: IClientRepository) {}

  async execute(): Promise<Client[]> {
    return await this.repository.getAll();
  }
}
