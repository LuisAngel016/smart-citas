import type { IClientRepository } from "../domain/domain/repositories/client.repository";

export class DeleteClientUseCase {
  constructor(private repository: IClientRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
