import type { UpcomingAppointment } from "@/dashboard/domain/entities/upcoming-appointment.entity";
import type { UpcomingAppointmentAPIResponse } from "../dto/upcoming-appointments-api.response";

export class UpcomingAppointmentsMapper {
  static toDomain(apiResponse: UpcomingAppointmentAPIResponse[]): UpcomingAppointment[] {
    return apiResponse.map((item) => ({
      time: item.time,
      client: item.client,
      service: item.service,
      status: item.status,
      color: item.color,
    }));
  }
}
