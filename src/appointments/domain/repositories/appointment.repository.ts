import { Appointment } from "../entities/appointment.entity";

export interface IAppointmentRepository {
  getAll(): Promise<Appointment[]>;
  getById(id: string): Promise<Appointment>;
  create(data: Omit<Appointment, "id">): Promise<Appointment>;
  update(id: string, data: Partial<Omit<Appointment, "id">>): Promise<Appointment>;
  delete(id: string): Promise<boolean>;
}