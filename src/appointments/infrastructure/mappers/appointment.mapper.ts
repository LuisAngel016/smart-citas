import type { AppointmentPage } from "@/appointments/domain/interfaces/appointment-page.interface";
import { Appointment } from "../../domain/entities/appointment.entity";
import type { AppointmentAPIResponse } from "../dto/response/appointment-api.response";
import type { AppointmentsApiResponse } from "../dto/response/appointments-api.response";

export class AppointmentMapper {
  static toDomain(appointments: AppointmentsApiResponse): AppointmentPage {
    const data: Appointment[] = appointments.results.map(result => ({
      id: result.id,
      clientName: result.client_name,
      clientPhone: result.client_phone,
      clientEmail: result.client_email,
      service: result.service,
      date: result.date,
      time: result.time,
      notes: result.notes,
      createdAt: new Date(result.created_at),
      updatedAt: result.updated_at ? new Date(result.updated_at) : undefined,
    }));
    
    return {
      data,
      total: appointments.total,
    };
  }
  
  static toDomainSingle(result: AppointmentAPIResponse): Appointment {
    return {
      id: result.id,
      clientName: result.client_name,
      clientPhone: result.client_phone,
      clientEmail: result.client_email,
      service: result.service,
      date: result.date,
      time: result.time,
      notes: result.notes,
      createdAt: new Date(result.created_at),
      updatedAt: result.updated_at ? new Date(result.updated_at) : undefined,
    };
  }
}
