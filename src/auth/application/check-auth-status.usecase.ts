import type { Session } from "../domain/interfaces/session.interface";
import type { IAuthRepository } from "../domain/repositories/auth.repository";


export class CheckAuthStatusUseCase {
  constructor(private repository: IAuthRepository) {}

  async execute(): Promise<Session> {
    return await this.repository.checkAuthStatus();
  }
}
