import type { IDashboardRepository } from "../domain/repositories/dashboard.repository";
import type { DashboardStats } from "../domain/entities/dashboard-stats.entity";

export class GetDashboardStatsUseCase {
  constructor(private readonly repository: IDashboardRepository) {}

  async execute(): Promise<DashboardStats> {
    return await this.repository.getStats();
  }
}
