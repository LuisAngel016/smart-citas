import { DashboardRepositoryImpl } from "../infrastructure/repositories/dashboard.repository.impl";
import { GetDashboardStatsUseCase } from "../application/get-dashboard-stats.usecase";
import { GetAppointmentsChartUseCase } from "../application/get-appointments-chart.usecase";
import { GetRevenueChartUseCase } from "../application/get-revenue-chart.usecase";
import { GetServicesChartUseCase } from "../application/get-services-chart.usecase";
import { GetUpcomingAppointmentsUseCase } from "../application/get-upcoming-appointments.usecase";

// Repository
const dashboardRepository = new DashboardRepositoryImpl();

// Container
export const dashboardContainer = {
	getDashboardStatsUseCase: new GetDashboardStatsUseCase(dashboardRepository),
	getAppointmentsChartUseCase: new GetAppointmentsChartUseCase(dashboardRepository),
	getRevenueChartUseCase: new GetRevenueChartUseCase(dashboardRepository),
	getServicesChartUseCase: new GetServicesChartUseCase(dashboardRepository),
	getUpcomingAppointmentsUseCase: new GetUpcomingAppointmentsUseCase(dashboardRepository),
};
