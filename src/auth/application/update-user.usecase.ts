import type { User } from "../domain/entities/user.entity";
import type { IUserRepository } from "../domain/repositories/user.repository";

export class UpdateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(id: string, data: User): Promise<User> {
    return await this.repository.update(id, data);
  }
}
