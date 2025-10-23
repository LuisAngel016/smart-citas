import type { Session } from "../domain/interfaces/session.interface";
import type { IUserRepository } from "../domain/repositories/user.repository";


export class StartLoginUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(email: string, password: string): Promise<Session> {
    return await this.repository.startLogin(email, password);
  }
}
