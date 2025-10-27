import type { Appointment } from "@/appointments/domain/entities/appointment.entity"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useCreateAppointment } from "./useCreateAppointment"
import { useUpdateAppointment } from "./useUpdateAppointment"
import formatServerError from "@/shared/lib/formatServerError"

/**
 * Hook personalizado para manejar el estado y lógica del formulario de citas
 * Utiliza react-hook-form para una gestión eficiente del formulario
 * @returns Estado y funciones para manejar el formulario de citas
 */
export interface AppointmentFormData {
    clientName: string
    clientPhone: string
    clientEmail: string
    service: string
    // En el formulario normalmente trabajamos con strings para inputs de fecha
    date: string
    time: string
    notes: string
}
export const useAppointmentForm = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)

    const {
        register,
        control,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
    } = useForm<AppointmentFormData>({
        defaultValues: {
            clientName: "",
            clientPhone: "",
            clientEmail: "",
            service: "",
            date: "",
            time: "",
            notes: "",
        },
    })

    /**
     * Maneja el envío del formulario
     */

    const { mutateAsync: createAppointmentAsync, isPending: isCreating } = useCreateAppointment()
    const { mutateAsync: updateAppointmentAsync, isPending: isUpdating } = useUpdateAppointment()

    const onSubmit = async (data: AppointmentFormData) => {
        // Construir payload compatible con backend (mantener date como string yyyy-MM-dd)
        const payload = {
            clientName: data.clientName,
            clientPhone: data.clientPhone,
            clientEmail: data.clientEmail,
            service: data.service,
            date: data.date || undefined,
            time: data.time,
            notes: data.notes,
            // Añadimos createdAt para cumplir con el tipo Omit<Appointment, 'id'>; el backend
            // puede ignorarlo o sobrescribirlo si no lo requiere.
            createdAt: new Date(),
        }

        try {
            if (editingAppointment) {
                // Para update pasamos solo los campos permitidos
                const updatePayload: Partial<Omit<Appointment, "id">> = {
                    clientName: payload.clientName,
                    clientPhone: payload.clientPhone,
                    clientEmail: payload.clientEmail,
                    service: payload.service,
                    date: payload.date,
                    time: payload.time,
                    notes: payload.notes,
                }
                await updateAppointmentAsync({ id: editingAppointment.id, appointmentData: updatePayload })
                toast.success("Cita actualizada", { description: `La cita de ${payload.clientName} fue actualizada.` })
            } else {
                // Create espera Omit<Appointment, 'id'>
                const createPayload = payload as Omit<Appointment, "id">;
                await createAppointmentAsync(createPayload)
                toast.success("Cita creada", { description: `La cita de ${payload.clientName} fue creada.` })
            }

            setIsDialogOpen(false)
            setEditingAppointment(null)
            reset()
        } catch (error) {
            // Normalizar y formatear mensaje para el usuario
            const err = error as unknown
            console.error("Error al guardar la cita:", err)

            const formatted = formatServerError(err, { entity: "cita" })

            // Mostrar toast de error con título y descripción en español
            if (formatted.description) {
                toast.error(formatted.title, { description: formatted.description })
            } else {
                toast.error(formatted.title)
            }
        }
    }

    /**
     * Abre el modal del formulario
     */
    const openDialog = () => {
        setEditingAppointment(null)
        reset()
        setIsDialogOpen(true)
    }

    /**
     * Cierra el modal del formulario
     */
    const openEditDialog = (appointment: Appointment) => {
        setEditingAppointment(appointment)
        // Normalizar campos que useForm espera como strings
        setValue("clientName", appointment.clientName || "")
        setValue("clientPhone", appointment.clientPhone || "")
        setValue("clientEmail", appointment.clientEmail || "")
        setValue("service", appointment.service || "")
        setValue(
            "date",
            appointment.date ? new Date(appointment.date as unknown as Date).toISOString().slice(0, 10) : "",
        )
        setValue("time", appointment.time || "")
        setValue("notes", appointment.notes || "")
        setIsDialogOpen(true)
    }

    const closeDialog = () => {
        setIsDialogOpen(false)
        setEditingAppointment(null)
        reset()
    }

    return {
        isDialogOpen,
        openDialog,
        openEditDialog,
        closeDialog,
        setIsDialogOpen,
        register,
        handleSubmit: handleFormSubmit(onSubmit),
        errors,
        // Combina el estado interno de react-hook-form con los estados de las mutaciones
        isSubmitting: isSubmitting || isCreating || isUpdating,
        reset,
        watch,
        control,
        setValue,
        editingAppointment,
    }
}
