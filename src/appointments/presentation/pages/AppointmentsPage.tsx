import { useAppointmentForm } from "@/appointments/infrastructure/hooks/useAppointmentForm";
import { useGetAppointments } from "@/appointments/infrastructure/hooks/useGetAppointments";
import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"
import { WeeklyCalendar } from "../components/WeeklyCalendar";
import { AppointmentModal } from "../components/AppointmentModal";
import { CalendarSkeleton } from "../components/CalendarSkelton";

export const AppointmentsPage = () => {
    const {
        isDialogOpen,
        openDialog,
        openEditDialog,
        closeDialog,
        register,
        handleSubmit,
        errors,
        isSubmitting,
        control,
        setValue,
        getValues,
        watch,
        editingAppointment,
    } = useAppointmentForm();

    const { data: appointments, isLoading } = useGetAppointments();

    if (isLoading || !appointments) {
        return <CalendarSkeleton />
    }

    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animated-duration-[800ms] animate-delay-100">
            <div className="flex items-center justify-between bg-white rounded-xl shadow p-4 dark:bg-gray-800">
                <div>
                    <h1 className="text-3xl font-bold text-foreground dark:text-gray-100">Citas</h1>
                    <p className="text-muted-foreground dark:text-gray-400 mt-1">Gestiona tu calendario de citas</p>
                </div>
                <div className="flex items-center font-medium">
                    <Button onClick={openDialog}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Cita
                    </Button>
                </div>
            </div>

            <WeeklyCalendar
                appointments={appointments}
                isLoading={isLoading}
                onEditAppointment={openEditDialog}
            />

            <AppointmentModal
                open={isDialogOpen}
                onOpenChange={closeDialog}
                register={register}
                control={control}
                errors={errors}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                setValue={setValue}
                getValues={getValues}
                watch={watch}
                editingAppointment={editingAppointment}
            />
        </div>
    )
}