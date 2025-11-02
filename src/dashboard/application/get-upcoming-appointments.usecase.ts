import type { IDashboardRepository } from "../domain/repositories/dashboard.repository";
import type { UpcomingAppointment } from "../domain/entities/upcoming-appointment.entity";

export class GetUpcomingAppointmentsUseCase {
  constructor(private readonly repository: IDashboardRepository) {}

  async execute(): Promise<UpcomingAppointment[]> {
    return await this.repository.getUpcomingAppointments();
  }
}
