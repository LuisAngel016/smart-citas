import type { User } from "@/auth/domain/entities/user.entity";
import type { IUserRepository } from "@/users/domain/repositories/user.repository";
import type { UpdateUserFormDTO } from "../domain/interfaces/update-user-form.dto";

export class UpdateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(id: string, data: UpdateUserFormDTO): Promise<User> {
    return await this.repository.update(id, data);
  }
}
