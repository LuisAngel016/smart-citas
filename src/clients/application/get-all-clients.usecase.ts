import type { ClientPage } from "../domain/domain/interfaces/client-page.interface";
import type { IClientRepository } from "../domain/domain/repositories/client.repository";


export class GetAllClientsUseCase {
  constructor(private repository: IClientRepository) {}

  async execute(): Promise<ClientPage> {
    return await this.repository.getAll();
  }
}
