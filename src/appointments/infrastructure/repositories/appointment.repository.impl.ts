import type { IAppointmentRepository } from "../../domain/repositories/appointment.repository";
import { Appointment } from "../../domain/entities/appointment.entity";
import type { IHttpClient } from "@/shared/api/interfaces/http-client.interface";
import type { AppointmentPage } from "@/appointments/domain/interfaces/appointment-page.interface";
import type { AppointmentsApiResponse } from "../dto/response/appointments-api.response";
import type { AppointmentAPIResponse } from "../dto/response/appointment-api.response";
import { AppointmentMapper } from "../mappers/appointment.mapper";

export class AppointmentRepositoryImpl implements IAppointmentRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(): Promise<AppointmentPage> {
    const { data } = await this.httpClient.get<AppointmentsApiResponse>("/appointments");
    const appointments = AppointmentMapper.toDomain(data);
    return appointments;
  }

  async getById(id: string): Promise<Appointment> {
    const { data } = await this.httpClient.get<AppointmentAPIResponse>(`/appointments/${id}`);
    const appointment = AppointmentMapper.toDomainSingle(data);
    return appointment;
  }

  async create(appointmentData: Omit<Appointment, "id">): Promise<Appointment> {
    const { data } = await this.httpClient.post<AppointmentAPIResponse>("/appointments", appointmentData);
    const appointment = AppointmentMapper.toDomainSingle(data);
    return appointment;
  }

  async update(id: string, appointmentData: Partial<Omit<Appointment, "id">>): Promise<Appointment> {
    const { data } = await this.httpClient.patch<AppointmentAPIResponse>(`/appointments/${id}`, appointmentData);
    const appointment = AppointmentMapper.toDomainSingle(data);
    return appointment;
  }

  async delete(id: string): Promise<boolean> {
    await this.httpClient.delete(`/appointments/${id}`);
    return true;
  }
}
