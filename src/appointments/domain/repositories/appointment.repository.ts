import { Appointment } from "../entities/appointment.entity";
import type { AppointmentPage } from "../interfaces/appointment-page.interface";
import type { CreateAppointmentDTO, UpdateAppointmentDTO } from "../interfaces/create-appointment.dto";

export interface IAppointmentRepository {
  getAll(): Promise<AppointmentPage>;
  getById(id: string): Promise<Appointment>;
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  update(id: string, data: UpdateAppointmentDTO): Promise<Appointment>;
  delete(id: string): Promise<boolean>;
}