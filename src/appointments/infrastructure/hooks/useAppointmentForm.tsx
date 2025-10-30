import type { Appointment } from "@/appointments/domain/entities/appointment.entity"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useCreateAppointment } from "./useCreateAppointment"
import { useUpdateAppointment } from "./useUpdateAppointment"
import formatServerError from "@/shared/lib/formatServerError"
import type { CreateAppointmentDTO, UpdateAppointmentDTO } from "@/appointments/domain/interfaces/create-appointment.dto"
import { useAuthStore } from "@/auth/store/auth.store"

/**
 * Hook personalizado para manejar el estado y lógica del formulario de citas
 * Utiliza react-hook-form para una gestión eficiente del formulario
 * @returns Estado y funciones para manejar el formulario de citas
 */
export interface AppointmentFormData {
    idClient: string
    idService: string
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
            idClient: "",
            idService: "",
            date: "",
            time: "",
            notes: "",
        },
    })

    const { user } = useAuthStore()

    const { mutateAsync: createAppointmentAsync, isPending: isCreating } = useCreateAppointment()
    const { mutateAsync: updateAppointmentAsync, isPending: isUpdating } = useUpdateAppointment()

    const onSubmit = async (data: AppointmentFormData) => {
        // Construir payload compatible con backend (mantener date como string yyyy-MM-dd)
        const payload: CreateAppointmentDTO = {
            id_client: data.idClient,
            id_service: data.idService,
            date: data.date,
            time: data.time,
            notes: data.notes,
            createdBy: user?.id ?? '',
        }

        try {
            if (editingAppointment) {
                await updateAppointmentAsync({ id: editingAppointment.id, appointmentData: payload as UpdateAppointmentDTO })
                toast.success("Cita actualizada", { description: `La cita fue actualizada.` })
            } else {
                await createAppointmentAsync(payload)
                toast.success("Cita creada", { description: `La cita fue creada.` })
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

    // Nota: la mutación de eliminación se maneja desde un hook/dialog separado.


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
        setValue("idClient", appointment.idClient || "")
        setValue("idService", appointment.idService || "")
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
