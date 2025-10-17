import { Client } from "../entities/client.entity";

export interface ClientPage {
  data: Client[];
  total: number;
}
