import type { User } from "../domain/entities/user.entity";
import type { IUserRepository } from "../domain/repositories/user.repository";


export class GetUserByIdUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    return await this.repository.getById(id);
  }
}
