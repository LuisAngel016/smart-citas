import { useAppointmentForm } from "@/appointments/infrastructure/hooks/useAppointmentForm";
import { Button } from "@/shared/components/ui/button"
import { Plus, Filter } from "lucide-react"
import { WeeklyCalendar } from "../components/WeeklyCalendar";
import { AppointmentModal } from "../components/AppointmentModal";

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
        <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animated-duration-[800ms] animate-delay-100">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground dark:text-gray-100">Citas</h1>
                    <p className="text-muted-foreground dark:text-gray-400 mt-1">Gestiona tu calendario de citas</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
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
