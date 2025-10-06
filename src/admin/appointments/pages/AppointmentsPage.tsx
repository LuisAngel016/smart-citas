import { WeeklyCalendar } from "@/admin/appointments/components/WeeklyCalendar"
import { AppointmentModal } from "@/admin/appointments/components/AppointmentModal"
import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"
import { useAppointmentForm } from "@/admin/appointments/hooks/useAppointmentForm"

export const AppointmentsPage = () => {
    const {
        isDialogOpen,
        openDialog,
        setIsDialogOpen,
        register,
        handleSubmit,
        errors,
        isSubmitting,
        control,
    } = useAppointmentForm();

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Citas</h1>
                    <p className="text-muted-foreground mt-1">Gestiona tu calendario de citas</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrar
                    </Button>
                    <Button onClick={openDialog}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Cita
                    </Button>
                </div>
            </div>

            <WeeklyCalendar />

            <AppointmentModal
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                register={register}
                control={control}
                errors={errors}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}
