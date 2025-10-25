import type { Client } from "../domain/domain/entities/client.entity";
import type { IClientRepository } from "../domain/domain/repositories/client.repository";

export class UpdateClientUseCase {
  constructor(private repository: IClientRepository) {}

  async execute(id: string, data: Partial<Omit<Client, "id">>): Promise<Client> {
    return await this.repository.update(id, data);
  }
}
