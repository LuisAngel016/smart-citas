import { useState } from "react"
import { useForm } from "react-hook-form"
import type { ClientFormData } from "@/admin/clients/interfaces/client.interface"

/**
 * Hook personalizado para manejar el estado y lógica del formulario de clientes
 * Utiliza react-hook-form para una gestión eficiente del formulario
 * @returns Estado y funciones para manejar el formulario de clientes
 */
export const useClientForm = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    
    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<ClientFormData>({
        defaultValues: {
            nombre: "",
            email: "",
            telefono: "",
            direccion: "",
            notas: "",
        },
    })

    /**
     * Maneja el envío del formulario
     */
    const onSubmit = async (data: ClientFormData) => {
        try {
            // TODO: Aquí puedes agregar la lógica para guardar el cliente en el backend
            // Por ejemplo: await createClient(data)
            console.log("Datos del cliente:", data)
            
            // Cerrar el modal y resetear el formulario
            setIsDialogOpen(false)
            reset()
        } catch (error) {
            console.error("Error al guardar el cliente:", error)
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
        reset,
        watch,
    }
}
