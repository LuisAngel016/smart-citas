import type { User } from "../domain/entities/user.entity";
import type { IUserRepository } from "../domain/repositories/user.repository";

export class CreateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(data: User): Promise<User> {
    return await this.repository.create(data);
  }
}
