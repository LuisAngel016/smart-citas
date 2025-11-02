"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Calendar, Users, TrendingUp, DollarSign, ToolCase, /* ArrowUpRight */ } from "lucide-react"
import { StatCard } from "../components/StatCard"
import { AppointmentsChart } from "../components/AppointmentsChart"
import { RevenueChart } from "../components/RevenueChart"
import { ServicesList } from "../components/ServicesList"
import { UpcomingAppointmentsList } from "../components/UpcomingAppointmentsList"
import {
    useGetAppointmentsChart,
    useGetDashboardStats,
    useGetRevenueChart,
    useGetServicesChart,
    useGetUpcomingAppointments,
} from "@/dashboard";
import { DashboardSkeleton } from "../components/DashboardSkeleton"

export const DashboardPage = () => {

    const { data: stats, isLoading: statsLoading } = useGetDashboardStats()
    const { data: appointmentsData, isLoading: appointmentsLoading } = useGetAppointmentsChart()
    const { data: revenueData, isLoading: revenueLoading } = useGetRevenueChart()
    const { data: servicesData, isLoading: servicesLoading } = useGetServicesChart()
    const { data: upcomingData, isLoading: upcomingLoading } = useGetUpcomingAppointments()

    // Show skeleton while any data is loading
    const isLoading = statsLoading || appointmentsLoading || revenueLoading || servicesLoading || upcomingLoading

    if (isLoading) {
        return <DashboardSkeleton />
    }
    return (
        <div className="p-4 space-y-6 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-screen">
            {/* Header */}
            <div className="flex flex-col items-start justify-start bg-white rounded-xl shadow p-4 dark:bg-gray-800">
                <h1 className="text-3xl font-bold text-foreground dark:text-gray-100">Dashboard</h1>
                <p className="text-muted-foreground dark:text-gray-400 mt-1">Resumen completo de tu negocio</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Citas Hoy"
                    value={stats ? String(stats.citasHoy) : "-"}
                    description={stats ? stats.citasHoyDiff : ""}
                    icon={Calendar}
                />
                <StatCard
                    title="Clientes Activos"
                    value={stats ? String(stats.clientesActivos) : "-"}
                    description={stats ? stats.clientesActivosDiff : ""}
                    icon={Users}
                />
                <StatCard
                    title="Ingresos del Mes"
                    value={stats ? `$${stats.ingresosMes.toLocaleString()}` : "-"}
                    description={stats ? stats.ingresosMesDiff : ""}
                    icon={DollarSign}
                />
                <StatCard
                    title="Tasa de Ocupación"
                    value={stats ? `${stats.tasaOcupacion}%` : "-"}
                    description={stats ? stats.tasaOcupacionDiff : ""}
                    icon={TrendingUp}
                />
            </div>

            {/* Charts Row 1 */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Appointments Chart - Area Chart mejorado */}
                <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="dark:text-gray-100 text-xl">Citas de la Semana</CardTitle>
                                <CardDescription className="dark:text-gray-400">Comparación con promedio</CardDescription>
                            </div>
                            <div className="flex items-center gap-1 text-primary dark:text-primary">
                                <Calendar className="h-6 w-6" />
                                {/* <ArrowUpRight className="h-4 w-4" />
                                <span className="text-sm font-semibold">+18%</span> */}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <AppointmentsChart data={appointmentsData || []} />
                    </CardContent>
                </Card>

                {/* Revenue Chart - Stacked Bar mejorado */}
                <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="dark:text-gray-100 text-xl">Ingresos</CardTitle>
                                <CardDescription className="dark:text-gray-400">Últimos 6 meses</CardDescription>
                            </div>
                            <div className="text-right">
                                <DollarSign className="h-6 w-6 text-primary dark:text-primary" />
                                {/* <div className="text-right">
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">$29K</p>
                                    <p className="text-xs text-muted-foreground">Ganancia neta</p>
                                </div> */}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <RevenueChart data={revenueData || []} />
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Services Chart - Horizontal Bar mejorado */}
                <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="dark:text-gray-100 text-xl">Servicios Más Solicitados</CardTitle>
                                <CardDescription className="dark:text-gray-400">Este mes con tendencia</CardDescription>
                            </div>
                            <div className="flex items-center gap-1 text-primary dark:text-primary">
                                <ToolCase className="h-6 w-6 text-primary dark:text-primary" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ServicesList data={servicesData || []} />
                    </CardContent>
                </Card>

                {/* Recent Appointments - Mejorado */}
                <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="dark:text-gray-100 text-xl">Próximas Citas</CardTitle>
                                <CardDescription className="dark:text-gray-400">Citas programadas para hoy - próximos dias</CardDescription>
                            </div>
                            <div className="flex items-center gap-1 text-primary dark:text-primary">
                                <Calendar className="h-6 w-6 text-primary dark:text-primary" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <UpcomingAppointmentsList data={upcomingData || []} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}