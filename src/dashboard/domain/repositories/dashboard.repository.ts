import type { DashboardStats } from "../entities/dashboard-stats.entity";
import type { AppointmentsChartData } from "../entities/appointments-chart.entity";
import type { RevenueChartData } from "../entities/revenue-chart.entity";
import type { ServicesChartData } from "../entities/services-chart.entity";
import type { UpcomingAppointment } from "../entities/upcoming-appointment.entity";

export interface IDashboardRepository {
  getStats(): Promise<DashboardStats>;
  getAppointmentsChart(): Promise<AppointmentsChartData[]>;
  getRevenueChart(): Promise<RevenueChartData[]>;
  getServicesChart(): Promise<ServicesChartData[]>;
  getUpcomingAppointments(): Promise<UpcomingAppointment[]>;
}
