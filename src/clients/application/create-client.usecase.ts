import type { Client } from "../domain/domain/entities/client.entity";
import type { IClientRepository } from "../domain/domain/repositories/client.repository";

export class CreateClientUseCase {
  constructor(private repository: IClientRepository) {}

  async execute(data: Client): Promise<Client> {
    return await this.repository.create(data);
  }
}
