// Exportaciones limpias del módulo de Dashboard

// Hooks
export * from "./infrastructure/hooks";

// Entities (clases)
export { DashboardStats } from "./domain/entities/dashboard-stats.entity";
export { AppointmentsChartData } from "./domain/entities/appointments-chart.entity";
export { RevenueChartData } from "./domain/entities/revenue-chart.entity";
export { ServicesChartData } from "./domain/entities/services-chart.entity";
export { UpcomingAppointment } from "./domain/entities/upcoming-appointment.entity";

// Presentation
export { StatCard } from './presentation/components/StatCard'
export { DashboardPage } from './presentation/pages/DashboardPage'
