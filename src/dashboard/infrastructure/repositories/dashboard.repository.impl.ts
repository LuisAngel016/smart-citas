import type { IDashboardRepository } from "@/dashboard/domain/repositories/dashboard.repository";
import type { DashboardStats } from "@/dashboard/domain/entities/dashboard-stats.entity";
import type { AppointmentsChartData } from "@/dashboard/domain/entities/appointments-chart.entity";
import type { RevenueChartData } from "@/dashboard/domain/entities/revenue-chart.entity";
import type { ServicesChartData } from "@/dashboard/domain/entities/services-chart.entity";
import type { UpcomingAppointment } from "@/dashboard/domain/entities/upcoming-appointment.entity";
import { httpClient } from "@/shared/api";
import type { DashboardStatsAPIResponse } from "../dto/dashboard-stats-api.response";
import type { AppointmentsChartAPIResponse } from "../dto/appointments-chart-api.response";
import type { RevenueChartAPIResponse } from "../dto/revenue-chart-api.response";
import type { ServicesChartAPIResponse } from "../dto/services-chart-api.response";
import type { UpcomingAppointmentAPIResponse } from "../dto/upcoming-appointments-api.response";
import { DashboardStatsMapper } from "../mappers/dashboard-stats.mapper";
import { AppointmentsChartMapper } from "../mappers/appointments-chart.mapper";
import { RevenueChartMapper } from "../mappers/revenue-chart.mapper";
import { ServicesChartMapper } from "../mappers/services-chart.mapper";
import { UpcomingAppointmentsMapper } from "../mappers/upcoming-appointments.mapper";

export class DashboardRepositoryImpl implements IDashboardRepository {
  constructor(private readonly client = httpClient) {}

  async getStats(): Promise<DashboardStats> {
    const { data } = await this.client.get<DashboardStatsAPIResponse>("/dashboard/stats");
    return DashboardStatsMapper.toDomain(data);
  }

  async getAppointmentsChart(): Promise<AppointmentsChartData[]> {
    const { data } = await this.client.get<AppointmentsChartAPIResponse[]>("/dashboard/appointments-chart");
    return AppointmentsChartMapper.toDomain(data);
  }

  async getRevenueChart(): Promise<RevenueChartData[]> {
    const { data } = await this.client.get<RevenueChartAPIResponse[]>("/dashboard/revenue-chart");
    return RevenueChartMapper.toDomain(data);
  }

  async getServicesChart(): Promise<ServicesChartData[]> {
    const { data } = await this.client.get<ServicesChartAPIResponse[]>("/dashboard/services-chart");
    return ServicesChartMapper.toDomain(data);
  }

  async getUpcomingAppointments(): Promise<UpcomingAppointment[]> {
    const { data } = await this.client.get<UpcomingAppointmentAPIResponse[]>("/dashboard/upcoming-appointments");
    return UpcomingAppointmentsMapper.toDomain(data);
  }
}
