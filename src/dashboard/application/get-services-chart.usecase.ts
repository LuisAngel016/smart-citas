import type { IDashboardRepository } from "../domain/repositories/dashboard.repository";
import type { ServicesChartData } from "../domain/entities/services-chart.entity";

export class GetServicesChartUseCase {
  constructor(private readonly repository: IDashboardRepository) {}

  async execute(): Promise<ServicesChartData[]> {
    return await this.repository.getServicesChart();
  }
}
