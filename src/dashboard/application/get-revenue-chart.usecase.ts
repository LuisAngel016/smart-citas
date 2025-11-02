import type { IDashboardRepository } from "../domain/repositories/dashboard.repository";
import type { RevenueChartData } from "../domain/entities/revenue-chart.entity";

export class GetRevenueChartUseCase {
  constructor(private readonly repository: IDashboardRepository) {}

  async execute(): Promise<RevenueChartData[]> {
    return await this.repository.getRevenueChart();
  }
}
