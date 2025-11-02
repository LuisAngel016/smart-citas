import type { Business } from "../domain/entities/business.entity";
import type { UpdateBusinessFormDTO } from "../domain/interfaces/update-business-form.dto";
import type { IBusinessRepository } from "../domain/repositories/business.repository";

export class UpdateBusinessUseCase {
  constructor(private repository: IBusinessRepository) {}

  async execute(data: UpdateBusinessFormDTO): Promise<Business> {
    return await this.repository.update(data);
  }
}
