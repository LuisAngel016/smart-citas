import type { DashboardStats } from "@/dashboard/domain/entities/dashboard-stats.entity";
import type { DashboardStatsAPIResponse } from "../dto/dashboard-stats-api.response";

export class DashboardStatsMapper {
  static toDomain(apiResponse: DashboardStatsAPIResponse): DashboardStats {
    return {
      citasHoy: apiResponse.citasHoy,
      citasHoyDiff: apiResponse.citasHoyDiff,
      clientesActivos: apiResponse.clientesActivos,
      clientesActivosDiff: apiResponse.clientesActivosDiff,
      ingresosMes: apiResponse.ingresosMes,
      ingresosMesDiff: apiResponse.ingresosMesDiff,
      tasaOcupacion: apiResponse.tasaOcupacion,
      tasaOcupacionDiff: apiResponse.tasaOcupacionDiff,
    };
  }
}
