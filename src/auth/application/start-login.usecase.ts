import type { Session } from "../domain/interfaces/session.interface";
import type { IAuthRepository } from "../domain/repositories/auth.repository";


export class StartLoginUseCase {
  constructor(private repository: IAuthRepository) {}

  async execute(email: string, password: string): Promise<Session> {
    return await this.repository.startLogin(email, password);
  }
}
