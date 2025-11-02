import type { Appointment } from "@/appointments/domain/entities/appointment.entity";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateStatusAppointment } from "./useUpdateStatusAppointment";


export const useCompleteAppointmentDialog = () => {
    const [appointmentToComplete, setAppointmentToComplete] = useState<Appointment | null>(null);
    const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);

    const { mutateAsync: completeAppointment, isPending: isCompleting } = useUpdateStatusAppointment();

    const handleCompleteClick = (appointment: Appointment) => {
        setAppointmentToComplete(appointment);
        setIsCompleteDialogOpen(true);
    };

    const handleConfirmComplete = async () => {
        if (!appointmentToComplete?.id) return;

        try {
            await completeAppointment({ id: appointmentToComplete.id });

            toast.success("Cita completada", {
                description: `La cita "${appointmentToComplete.clientName} - ${appointmentToComplete.serviceName}" fue marcada como completada.`,
            });

            setIsCompleteDialogOpen(false);
            setAppointmentToComplete(null);
        } catch (error) {
            console.error("Error al completar la cita:", error);
            toast.error("Error al completar la cita", {
                description: "No se pudo completar la cita. Por favor, intenta nuevamente.",
            });
        }
    };

    return {
        appointmentToComplete,
        setAppointmentToComplete,
        isCompleteDialogOpen,
        setIsCompleteDialogOpen,
        handleCompleteClick,
        handleConfirmComplete,
        isCompleting,
    } as const;
};