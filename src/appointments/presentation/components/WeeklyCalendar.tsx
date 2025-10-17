"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/shared/lib/utils"

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8) // 8 AM to 8 PM
const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

interface Appointment {
    id: number
    day: number
    startHour: number
    duration: number // in hours
    client: string
    service: string
    status: "confirmed" | "pending" | "completed"
}

const mockAppointments: Appointment[] = [
    { id: 1, day: 0, startHour: 9, duration: 1, client: "María González", service: "Corte", status: "confirmed" },
    { id: 2, day: 0, startHour: 11, duration: 1.5, client: "Carlos Ruiz", service: "Tinte", status: "confirmed" },
    { id: 3, day: 1, startHour: 10, duration: 1, client: "Ana Martínez", service: "Peinado", status: "pending" },
    {
        id: 4,
        day: 2,
        startHour: 14,
        duration: 2,
        client: "Luis Hernández",
        service: "Corte + Color",
        status: "confirmed",
    },
    { id: 5, day: 3, startHour: 9, duration: 0.5, client: "Sofia López", service: "Barba", status: "completed" },
    { id: 6, day: 4, startHour: 16, duration: 1, client: "Pedro Sánchez", service: "Corte", status: "confirmed" },
]

export const WeeklyCalendar = () => {
    const [currentWeek, setCurrentWeek] = useState(0)
    const [appointments] = useState<Appointment[]>(mockAppointments)

    const getWeekDates = () => {
        const today = new Date()
        const currentDay = today.getDay()
        const monday = new Date(today)
        monday.setDate(today.getDate() - currentDay + 1 + currentWeek * 7)

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(monday)
            date.setDate(monday.getDate() + i)
            return date
        })
    }

    const weekDates = getWeekDates()

    const getAppointmentStyle = (appointment: Appointment) => {
        const top = (appointment.startHour - 8) * 80 + 40 // 80px per hour + header
        const height = appointment.duration * 80
        return { top: `${top}px`, height: `${height}px` }
    }

    const getStatusColor = (status: Appointment["status"]) => {
        switch (status) {
            case "confirmed":
                return "bg-accent/20 border-accent text-accent-foreground"
            case "pending":
                return "bg-muted border-muted-foreground/20 text-muted-foreground"
            case "completed":
                return "bg-primary/10 border-primary/30 text-primary"
        }
    }

    return (
        <div className="space-y-4">
            {/* Week Navigation */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-foreground dark:text-gray-100">
                        {weekDates[0].toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
                    </h2>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                        {weekDates[0].toLocaleDateString("es-ES", { day: "numeric", month: "short" })} -{" "}
                        {weekDates[6].toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)} className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentWeek(0)} className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700">
                        Hoy
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)} className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Calendar Grid */}
            <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        {/* Header with days */}
                        <div className="grid grid-cols-8 border-b border-border dark:border-gray-700 bg-muted/30 dark:bg-gray-900/50">
                            <div className="p-3 text-sm font-medium text-muted-foreground dark:text-gray-400">Hora</div>
                            {DAYS.map((day, index) => {
                                const date = weekDates[index]
                                const isToday = date.toDateString() === new Date().toDateString()
                                return (
                                    <div key={day} className={cn("p-3 text-center", isToday && "bg-primary/5 dark:bg-primary/10")}>
                                        <div className="text-sm font-medium text-foreground dark:text-gray-100">{day}</div>
                                        <div
                                            className={cn("text-xs text-muted-foreground dark:text-gray-400 mt-0.5", isToday && "text-primary dark:text-blue-400 font-semibold")}
                                        >
                                            {date.getDate()}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Time slots */}
                        <div className="relative">
                            <div className="grid grid-cols-8">
                                {/* Hours column */}
                                <div className="border-r border-border dark:border-gray-700">
                                    {HOURS.map((hour) => (
                                        <div key={hour} className="h-20 border-b border-border dark:border-gray-700 p-2 text-xs text-muted-foreground dark:text-gray-400">
                                            {hour.toString().padStart(2, "0")}:00
                                        </div>
                                    ))}
                                </div>

                                {/* Days columns */}
                                {DAYS.map((day, dayIndex) => (
                                    <div key={day} className="relative border-r border-border dark:border-gray-700 last:border-r-0">
                                        {HOURS.map((hour) => (
                                            <div
                                                key={`${day}-${hour}`}
                                                className="h-20 border-b border-border dark:border-gray-700 hover:bg-muted/30 dark:hover:bg-gray-700/30 transition-colors cursor-pointer group"
                                            >
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2">
                                                    <Button variant="ghost" size="sm" className="h-6 w-full text-xs dark:text-gray-300 dark:hover:bg-gray-600">
                                                        <Plus className="h-3 w-3 mr-1" />
                                                        Agregar
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Appointments overlay */}
                                        {appointments
                                            .filter((apt) => apt.day === dayIndex)
                                            .map((appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    className={cn(
                                                        "absolute left-1 right-1 rounded-md border-l-4 p-2 cursor-pointer hover:shadow-md transition-shadow",
                                                        getStatusColor(appointment.status),
                                                    )}
                                                    style={getAppointmentStyle(appointment)}
                                                >
                                                    <p className="text-xs font-semibold truncate">{appointment.client}</p>
                                                    <p className="text-xs truncate opacity-90">{appointment.service}</p>
                                                    <p className="text-xs opacity-75 mt-1">
                                                        {appointment.startHour}:00 - {appointment.startHour + appointment.duration}:00
                                                    </p>
                                                </div>
                                            ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Legend */}
            <div className="flex items-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-accent/20 border border-accent" />
                    <span className="text-muted-foreground">Confirmada</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-muted border border-muted-foreground/20" />
                    <span className="text-muted-foreground">Pendiente</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary/10 border border-primary/30" />
                    <span className="text-muted-foreground">Completada</span>
                </div>
            </div>
        </div>
    )
}
