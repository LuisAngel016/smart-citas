import type { ServicesChartData } from "@/dashboard/domain/entities/services-chart.entity";
import type { ServicesChartAPIResponse } from "../dto/services-chart-api.response";

export class ServicesChartMapper {
  static toDomain(apiResponse: ServicesChartAPIResponse[]): ServicesChartData[] {
    return apiResponse.map((item) => ({
      servicio: item.servicio,
      cantidad: item.cantidad,
      cambio: item.cambio,
    }));
  }
}
