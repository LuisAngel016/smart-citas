import type { IDashboardRepository } from "../domain/repositories/dashboard.repository";
import type { AppointmentsChartData } from "../domain/entities/appointments-chart.entity";

export class GetAppointmentsChartUseCase {
  constructor(private readonly repository: IDashboardRepository) {}

  async execute(): Promise<AppointmentsChartData[]> {
    return await this.repository.getAppointmentsChart();
  }
}
