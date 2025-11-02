import type { AppointmentStatus } from "../entities/appointment.entity"

export interface CreateAppointmentDTO {
  id_client: string
  id_service: string;
  date: string;
  time: string;
  notes?: string;
  status?: AppointmentStatus;
  createdBy: string;
}

export type UpdateAppointmentDTO = Partial<CreateAppointmentDTO>
