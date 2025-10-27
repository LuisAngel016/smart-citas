import { Appointment } from "../entities/appointment.entity";
import type { AppointmentPage } from "../interfaces/appointment-page.interface";

export interface IAppointmentRepository {
  getAll(): Promise<AppointmentPage>;
  getById(id: string): Promise<Appointment>;
  create(data: Omit<Appointment, "id">): Promise<Appointment>;
  update(id: string, data: Partial<Omit<Appointment, "id">>): Promise<Appointment>;
  delete(id: string): Promise<boolean>;
}