import type { AppointmentsChartData } from "@/dashboard/domain/entities/appointments-chart.entity";
import type { AppointmentsChartAPIResponse } from "../dto/appointments-chart-api.response";

export class AppointmentsChartMapper {
  static toDomain(apiResponse: AppointmentsChartAPIResponse[]): AppointmentsChartData[] {
    return apiResponse.map((item) => ({
      day: item.day,
      citas: item.citas,
      promedio: item.promedio,
    }));
  }
}
