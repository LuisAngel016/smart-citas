import type { AppointmentStatus } from "../entities/appointment.entity";

export interface UpdateStatusAppointment {
  status: AppointmentStatus;
}