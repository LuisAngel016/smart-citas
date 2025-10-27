"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Switch } from "@/shared/components/ui/switch"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { Clock } from "lucide-react"

const schedules = [
    { day: "Lunes", enabled: true, start: "09:00", end: "18:00" },
    { day: "Martes", enabled: true, start: "09:00", end: "18:00" },
    { day: "Miércoles", enabled: true, start: "09:00", end: "18:00" },
    { day: "Jueves", enabled: true, start: "09:00", end: "18:00" },
    { day: "Viernes", enabled: true, start: "09:00", end: "20:00" },
    { day: "Sábado", enabled: true, start: "10:00", end: "16:00" },
    { day: "Domingo", enabled: false, start: "09:00", end: "18:00" },
]

export const SchedulesPage = () => {
    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animated-duration-[800ms] animate-delay-100">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary dark:text-blue-400" />
                        <CardTitle className="dark:text-gray-100">Horario de Atención</CardTitle>
                    </div>
                    <CardDescription className="dark:text-gray-400">Configura tus días y horarios de trabajo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {schedules.map((schedule, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border border-border dark:border-gray-700 rounded-lg">
                            <Switch defaultChecked={schedule.enabled} />
                            <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                                <span className="font-medium text-foreground dark:text-gray-100">{schedule.day}</span>
                                <Input type="time" defaultValue={schedule.start} disabled={!schedule.enabled} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                                <Input type="time" defaultValue={schedule.end} disabled={!schedule.enabled} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                            </div>
                        </div>
                    ))}
                    <Button className="mt-4">Guardar Horarios</Button>
                </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="dark:text-gray-100">Duración de Slots</CardTitle>
                    <CardDescription className="dark:text-gray-400">Configura la duración mínima de cada cita</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground dark:text-gray-400">Duración del Slot (minutos)</label>
                        <Input id="slot-duration" type="number" defaultValue="30" min={15} step={15} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                    </div>
                    <Button>Guardar Cambios</Button>
                </CardContent>
            </Card>
        </div>
    )
}
