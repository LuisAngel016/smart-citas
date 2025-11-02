import { DashboardRepositoryImpl } from "../infrastructure/repositories/dashboard.repository.impl";
import { GetDashboardStatsUseCase } from "../application/get-dashboard-stats.usecase";
import { GetAppointmentsChartUseCase } from "../application/get-appointments-chart.usecase";
import { GetRevenueChartUseCase } from "../application/get-revenue-chart.usecase";
import { GetServicesChartUseCase } from "../application/get-services-chart.usecase";
import { GetUpcomingAppointmentsUseCase } from "../application/get-upcoming-appointments.usecase";

// Repository
const dashboardRepository = new DashboardRepositoryImpl();

// Use Cases
export const getDashboardStatsUseCase = new GetDashboardStatsUseCase(dashboardRepository);
export const getAppointmentsChartUseCase = new GetAppointmentsChartUseCase(dashboardRepository);
export const getRevenueChartUseCase = new GetRevenueChartUseCase(dashboardRepository);
export const getServicesChartUseCase = new GetServicesChartUseCase(dashboardRepository);
export const getUpcomingAppointmentsUseCase = new GetUpcomingAppointmentsUseCase(dashboardRepository);
