import type { Appointment } from "@/appointments/domain/entities/appointment.entity";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteAppointment } from "./useDeleteAppointment";

export const useDeleteAppointmentDialog = () => {
    const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const { mutateAsync: deleteAppointment, isPending: isDeleting } = useDeleteAppointment();

    const handleDeleteClick = (appointment: Appointment) => {
        setAppointmentToDelete(appointment);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!appointmentToDelete?.id) return;

        try {
            await deleteAppointment(appointmentToDelete.id);

            toast.success("Cita eliminada", {
                description: `La cita "${appointmentToDelete.clientName} - ${appointmentToDelete.serviceName}" fue eliminada.`,
            });

            setIsDeleteDialogOpen(false);
            setAppointmentToDelete(null);
        } catch (error) {
            console.error("Error al eliminar la cita:", error);
            toast.error("Error al eliminar la cita", {
                description: "No se pudo eliminar la cita. Por favor, intenta nuevamente.",
            });
        }
    };

    return {
        appointmentToDelete,
        setAppointmentToDelete,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleDeleteClick,
        handleConfirmDelete,
        isDeleting,
    } as const;
};
