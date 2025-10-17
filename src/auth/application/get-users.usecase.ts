import type { User } from "../domain/entities/user.entity";
import type { IUserRepository } from "../domain/repositories/user.repository";


export class GetUsersUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this.repository.getAll();
  }
}
