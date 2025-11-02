import type { Business } from "../entities/business.entity";
import type { UpdateBusinessFormDTO } from "../interfaces/update-business-form.dto";

export interface IBusinessRepository {
  getAll(): Promise<Business>;
  update(data: UpdateBusinessFormDTO): Promise<Business>;
}
