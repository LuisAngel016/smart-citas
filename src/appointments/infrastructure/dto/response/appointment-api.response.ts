import type { Client } from "@/clients/domain/domain/entities/client.entity";
import type { Service } from "@/services/domain/entities/service.entity";

export interface AppointmentAPIResponse {
  id:         string;
  id_client:  string;
  id_service: string;
  date:       string;
  time:       string;
  notes:      string;
  isActive:   boolean;
  createdBy:  string;
  createdAt:  Date;
  updatedAt:  Date;
  service:    Service;
  client:     Client;
}

