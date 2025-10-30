import type { IClientRepository } from "../domain/domain/repositories/client.repository";
import type { CreateClientDTO } from "../domain/domain/interfaces/create-client.dto";
import type { Client } from "../domain/domain/entities/client.entity";

export class CreateClientUseCase {
  constructor(private repository: IClientRepository) {}

  async execute(data: CreateClientDTO): Promise<Client> {
    return await this.repository.create(data);
  }
}
