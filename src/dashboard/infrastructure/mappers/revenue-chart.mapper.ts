import type { RevenueChartData } from "@/dashboard/domain/entities/revenue-chart.entity";
import type { RevenueChartAPIResponse } from "../dto/revenue-chart-api.response";

export class RevenueChartMapper {
  static toDomain(apiResponse: RevenueChartAPIResponse[]): RevenueChartData[] {
    return apiResponse.map((item) => ({
      mes: item.mes,
      ingresos: item.ingresos,
      gastos: item.gastos,
    }));
  }
}
