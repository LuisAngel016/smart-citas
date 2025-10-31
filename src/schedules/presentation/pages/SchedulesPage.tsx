"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Switch } from "@/shared/components/ui/switch"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { Clock } from "lucide-react"
import { Controller } from "react-hook-form"
import { TimePicker } from "@/shared/components/custom"
import { useScheduleForm } from "@/schedules/infrastructure/hooks/useScheduleForm"
import { useSlotDurationForm } from "@/schedules/infrastructure/hooks/useSlotDurationForm"
import { useGetSchedules } from "@/schedules/infrastructure/hooks/useGetSchedules"
import { useGetScheduleSlotDuration } from "@/schedules/infrastructure/hooks/useGetScheduleSlotDuration"
import { SchedulesLoadingSkeleton } from "@/schedules/presentation/components/SchedulesLoadingSkeleton"

export const SchedulesPage = () => {
    const { data: schedulesData, isLoading } = useGetSchedules();
    const { data: slotDurationData, isLoading: isSlotLoading } = useGetScheduleSlotDuration();

    const {
        control,
        handleSubmit,
        isSubmitting,
    } = useScheduleForm(schedulesData);

    const {
        control: slotControl,
        handleSubmit: handleSlotSubmit,
        isSubmitting: isSlotSubmitting,
    } = useSlotDurationForm(slotDurationData?.slotDuration);

    if (isLoading || isSlotLoading) {
        return <SchedulesLoadingSkeleton />
    }

    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animated-duration-[800ms] animate-delay-100">
            <form onSubmit={handleSubmit}>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary dark:text-blue-400" />
                            <CardTitle className="dark:text-gray-100">Horario de Atención</CardTitle>
                        </div>
                        <CardDescription className="dark:text-gray-400">
                            Configura tus días y horarios de trabajo
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {schedulesData?.map((schedule, index) => (
                            <div
                                key={schedule.id}
                                className="flex items-center gap-4 p-4 border border-border dark:border-gray-700 rounded-lg"
                            >
                                <Controller
                                    control={control}
                                    name={`schedules.${index}.enabled`}
                                    render={({ field }) => (
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                                <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                                    <span className="font-medium text-foreground dark:text-gray-100">
                                        {schedule.day}
                                    </span>
                                    <Controller
                                        control={control}
                                        name={`schedules.${index}.start`}
                                        render={({ field }) => (
                                            <TimePicker value={field.value} onChange={field.onChange} className="bg-background" />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`schedules.${index}.end`}
                                        render={({ field }) => (
                                            <TimePicker value={field.value} onChange={field.onChange} className="bg-background" />
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                        <Button type="submit" className="mt-4" disabled={isSubmitting}>
                            {isSubmitting ? "Guardando..." : "Guardar Horarios"}
                        </Button>
                    </CardContent>
                </Card>
            </form>

            <form onSubmit={handleSlotSubmit}>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                        <CardTitle className="dark:text-gray-100">Duración de Slots</CardTitle>
                        <CardDescription className="dark:text-gray-400">
                            Configura la duración mínima de cada cita
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground dark:text-gray-400">
                                Duración del Slot (minutos)
                            </label>
                            <Controller
                                control={slotControl}
                                name="slotDuration"
                                render={({ field }) => (
                                    <Input
                                        id="slot-duration"
                                        type="number"
                                        value={field.value}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        step={15}
                                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                    />
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={isSlotSubmitting} className="mt-2">
                            {isSlotSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}