import type { Appointment } from "@/appointments/domain/entities/appointment.entity"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { httpClient } from "@/shared/api"

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
    const toLocalDate = (dateStr: string): Date => {
        // fecha en formato yyyy-MM-dd
        const [y, m, d] = dateStr.split("-").map(Number)
        return new Date(y, (m || 1) - 1, d || 1)
    }

    const onSubmit = async (data: AppointmentFormData) => {
        try {
            // Construir payload compatible con backend
            const payload = {
                clientName: data.clientName,
                clientPhone: data.clientPhone,
                clientEmail: data.clientEmail,
                service: data.service,
                // date en el formulario es string yyyy-MM-dd -> convertir a Date local
                date: data.date ? toLocalDate(data.date) : undefined,
                time: data.time,
                notes: data.notes,
            }

            if (editingAppointment) {
                // update
                await httpClient.put(`/appointments/${editingAppointment.id}`, payload)
                toast.success("Cita actualizada", { description: `La cita de ${payload.clientName} fue actualizada.` })
            } else {
                // create
                await httpClient.post(`/appointments`, payload)
                toast.success("Cita creada", { description: `La cita de ${payload.clientName} fue creada.` })
            }

            setIsDialogOpen(false)
            setEditingAppointment(null)
            reset()
        } catch (error: unknown) {
            console.error("Error al guardar la cita:", error)
            // Manejo simple de errores
            // intentar extraer código de estado si existe
            const errAny = error as { response?: { status?: number } }
            if (errAny?.response?.status === 409) {
                toast.error("Conflicto al guardar la cita", { description: "Ya existe un recurso en conflicto." })
                return
            }
            toast.error("Error al guardar la cita", { description: "Intenta nuevamente más tarde." })
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
        isSubmitting,
        control,
        reset,
        watch,
        editingAppointment,
    }
}
