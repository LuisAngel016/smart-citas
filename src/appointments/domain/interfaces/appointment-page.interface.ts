import { Appointment } from "../entities/appointment.entity";

export interface AppointmentPage {
  data: Appointment[];
  total: number;
}
