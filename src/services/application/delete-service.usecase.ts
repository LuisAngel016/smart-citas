import type { IServiceRepository } from "../domain/repositories/service.repository";

export class DeleteServiceUseCase {
  constructor(private repository: IServiceRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
