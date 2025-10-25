import type { Service } from "../entities/service.entity";

export interface ServicePage {
  data: Service[];
  total: number;
}
