import { useState } from "react"
import { useForm } from "react-hook-form"
import type { AppointmentFormData } from "@/admin/appointments/interfaces/appointment.interface"

/**
 * Hook personalizado para manejar el estado y lógica del formulario de citas
 * Utiliza react-hook-form para una gestión eficiente del formulario
 * @returns Estado y funciones para manejar el formulario de citas
 */
export const useAppointmentForm = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    
    const {
    register,
    control,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
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
    const onSubmit = async (data: AppointmentFormData) => {
        try {
            // TODO: Aquí puedes agregar la lógica para guardar la cita en el backend
            // Por ejemplo: await createAppointment(data)
            console.log("Datos de la cita:", data)
            
            // Cerrar el modal y resetear el formulario
            setIsDialogOpen(false)
            reset()
        } catch (error) {
            console.error("Error al guardar la cita:", error)
            // TODO: Mostrar notificación de error
        }
    }

    /**
     * Abre el modal del formulario
     */
    const openDialog = () => setIsDialogOpen(true)

    /**
     * Cierra el modal del formulario
     */
    const closeDialog = () => {
        setIsDialogOpen(false)
        reset()
    }

    return {
        isDialogOpen,
        openDialog,
        closeDialog,
        setIsDialogOpen,
        register,
        handleSubmit: handleFormSubmit(onSubmit),
        errors,
        isSubmitting,
        control,
        reset,
        watch,
    }
}
