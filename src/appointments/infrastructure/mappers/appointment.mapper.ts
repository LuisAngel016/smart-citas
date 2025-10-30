import type { AppointmentPage } from "@/appointments/domain/interfaces/appointment-page.interface";
import { Appointment } from "../../domain/entities/appointment.entity";
import type { AppointmentAPIResponse } from "../dto/response/appointment-api.response";
import type { AppointmentsApiResponse } from "../dto/response/appointments-api.response";

export class AppointmentMapper {
  static toDomain(appointments: AppointmentsApiResponse): AppointmentPage {
    const data: Appointment[] = appointments.data.map(result => ({
      id: result.id,
      idClient: result.client.id,
      clientName: result.client.name,
      clientPhone: result.client.phone,
      clientEmail: result.client.email,
      idService: result.service.id,
      serviceName: result.service.name,
      servicePrice: result.service.price,
      serviceDuration: result.service.duration,
      date: result.date,
      time: result.time,
      notes: result.notes,
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.updatedAt),
    }));

    return {
      data,
      total: appointments.total,
    };
  }
  
  static toDomainSingle(result: AppointmentAPIResponse): Appointment {
    return {
      id: result.id,
      idClient: result.client.id,
      clientName: result.client.name,
      clientPhone: result.client.phone,
      clientEmail: result.client.email,
      idService: result.service.id,
      serviceName: result.service.name,
      servicePrice: result.service.price,
      serviceDuration: result.service.duration,
      date: result.date,
      time: result.time,
      notes: result.notes,
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.updatedAt),
    };
  }
}
