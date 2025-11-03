import type { Session } from "../domain/interfaces/session.interface";
import type { IUserRepository } from "../domain/repositories/user.repository";


export class StartRegisterUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(email: string, password: string, fullName: string): Promise<Session> {
    return await this.repository.startRegister(email, password, fullName);
  }
}
