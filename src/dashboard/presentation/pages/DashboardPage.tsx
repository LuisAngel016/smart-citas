"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Calendar, Users, Clock, TrendingUp, DollarSign, CheckCircle } from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart"
import { StatCard } from "../components/StatCard"

const appointmentsData = [
    { day: "Lun", citas: 12 },
    { day: "Mar", citas: 15 },
    { day: "Mié", citas: 10 },
    { day: "Jue", citas: 18 },
    { day: "Vie", citas: 22 },
    { day: "Sáb", citas: 25 },
    { day: "Dom", citas: 8 },
]

const revenueData = [
    { mes: "Ago", ingresos: 45000 },
    { mes: "Sep", ingresos: 52000 },
    { mes: "Oct", ingresos: 48000 },
    { mes: "Nov", ingresos: 61000 },
    { mes: "Dic", ingresos: 58000 },
    { mes: "Ene", ingresos: 67000 },
]

const servicesData = [
    { servicio: "Corte", cantidad: 45 },
    { servicio: "Tinte", cantidad: 28 },
    { servicio: "Peinado", cantidad: 32 },
    { servicio: "Barba", cantidad: 18 },
    { servicio: "Otros", cantidad: 12 },
]

export const DashboardPage = () => {
    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animation-duration-[800ms] animate-delay-100">
            <div className="bg-white rounded-xl shadow p-4 dark:bg-gray-800">
                <h1 className="text-3xl font-bold text-foreground dark:text-gray-100">Dashboard</h1>
                <p className="text-muted-foreground dark:text-gray-400 mt-1">Resumen de tu negocio</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Citas Hoy"
                    value="12"
                    description="+2 desde ayer"
                    icon={Calendar}
                />

                <StatCard
                    title="Clientes Activos"
                    value="248"
                    description="+18 este mes"
                    icon={Users}
                />

                <StatCard
                    title="Ingresos del Mes"
                    value="$67,000"
                    description="+15% vs mes anterior"
                    icon={DollarSign}
                />

                <StatCard
                    title="Tasa de Ocupación"
                    value="78%"
                    description="+5% vs semana pasada"
                    icon={TrendingUp}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Appointments Chart */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                        <CardTitle className="dark:text-gray-100">Citas de la Semana</CardTitle>
                        <CardDescription className="dark:text-gray-400">Número de citas por día</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                citas: {
                                    label: "Citas",
                                    color: "hsl(var(--primary))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={appointmentsData}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="day" className="text-xs" />
                                    <YAxis className="text-xs" />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line
                                        type="monotone"
                                        dataKey="citas"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                        dot={{ fill: "hsl(var(--primary))" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Revenue Chart */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                        <CardTitle className="dark:text-gray-100">Ingresos Mensuales</CardTitle>
                        <CardDescription className="dark:text-gray-400">Últimos 6 meses</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                ingresos: {
                                    label: "Ingresos",
                                    color: "hsl(var(--accent))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="mes" className="text-xs" />
                                    <YAxis className="text-xs" />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="ingresos" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Services Chart */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                        <CardTitle className="dark:text-gray-100">Servicios Más Solicitados</CardTitle>
                        <CardDescription className="dark:text-gray-400">Este mes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                cantidad: {
                                    label: "Cantidad",
                                    color: "hsl(var(--primary))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={servicesData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis type="number" className="text-xs" />
                                    <YAxis dataKey="servicio" type="category" className="text-xs" width={80} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="cantidad" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Recent Appointments */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                        <CardTitle className="dark:text-gray-100">Próximas Citas</CardTitle>
                        <CardDescription className="dark:text-gray-400">Citas programadas para hoy</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { time: "09:00", client: "María González", service: "Corte de Cabello", status: "Confirmada" },
                                { time: "10:30", client: "Carlos Ruiz", service: "Tinte", status: "Confirmada" },
                                { time: "12:00", client: "Ana Martínez", service: "Peinado", status: "Pendiente" },
                                { time: "14:00", client: "Luis Hernández", service: "Corte + Barba", status: "Confirmada" },
                                { time: "15:30", client: "Sofia López", service: "Corte", status: "Confirmada" },
                            ].map((appointment, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between py-3 border-b border-border dark:border-gray-700 last:border-0"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20">
                                            <Clock className="h-5 w-5 text-primary dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground dark:text-gray-100">{appointment.client}</p>
                                            <p className="text-xs text-muted-foreground dark:text-gray-400">
                                                {appointment.time} • {appointment.service}
                                            </p>
                                        </div>
                                    </div>
                                    {appointment.status === "Confirmada" && <CheckCircle className="h-5 w-5 text-accent dark:text-green-400" />}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
