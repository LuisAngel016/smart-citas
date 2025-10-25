import type { IAppointmentRepository } from "../../domain/repositories/appointment.repository";
import { Appointment } from "../../domain/entities/appointment.entity";
import type { IHttpClient } from "@/shared/api/interfaces/http-client.interface";

export class AppointmentRepositoryImpl implements IAppointmentRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(): Promise<Appointment[]> {
    const { data } = await this.httpClient.get<Appointment[]>("/appointments");
    return data;
  }

  async getById(id: string): Promise<Appointment> {
    const { data } = await this.httpClient.get<Appointment>(`/appointments/${id}`);
    return data;
  }

  async create(appointmentData: Omit<Appointment, "id">): Promise<Appointment> {
    const { data } = await this.httpClient.post<Appointment>("/appointments", appointmentData);
    return data;
  }

  async update(id: string, appointmentData: Partial<Omit<Appointment, "id">>): Promise<Appointment> {
    const { data } = await this.httpClient.patch<Appointment>(`/appointments/${id}`, appointmentData);
    return data;
  }

  async delete(id: string): Promise<boolean> {
    await this.httpClient.delete(`/appointments/${id}`);
    return true;
  }
}
