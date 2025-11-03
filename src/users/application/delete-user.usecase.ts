import type { IUserRepository } from "../domain/repositories/user.repository";

export class DeleteUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
