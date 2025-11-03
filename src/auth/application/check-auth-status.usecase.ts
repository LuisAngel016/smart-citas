import type { Session } from "../domain/interfaces/session.interface";
import type { IUserRepository } from "../domain/repositories/auth.repository";


export class CheckAuthStatusUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(): Promise<Session> {
    return await this.repository.checkAuthStatus();
  }
}
