import type { Business } from "../domain/entities/business.entity";
import type { IBusinessRepository } from "../domain/repositories/business.repository";

export class GetAllBusinessUseCase {
  constructor(private repository: IBusinessRepository) {}

  async execute(): Promise<Business> {
    return await this.repository.getAll();
  }
}
