import type { ServicePage } from "../domain/interfaces/service-page.interface";
import type { IServiceRepository } from "../domain/repositories/service.repository";


export class GetAllServicesUseCase {
  constructor(private repository: IServiceRepository) {}

  async execute(): Promise<ServicePage> {
    return await this.repository.getAll();
  }
}
