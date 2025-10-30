import type { IClientRepository } from "../domain/domain/repositories/client.repository";
import type { UpdateClientDTO } from "../domain/domain/interfaces/create-client.dto";
import type { Client } from "../domain/domain/entities/client.entity";

export class UpdateClientUseCase {
  constructor(private repository: IClientRepository) {}

  async execute(id: string, data: UpdateClientDTO): Promise<Client> {
    return await this.repository.update(id, data);
  }
}
