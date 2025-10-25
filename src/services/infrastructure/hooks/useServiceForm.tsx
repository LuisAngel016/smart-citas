import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAuthStore } from "@/auth/store/auth.store"
import formatServerError from "@/shared/lib/formatServerError"
import type { Service } from "@/services/domain/entities/service.entity"
import { useCreateService } from "./useCreateService"

export interface ServiceFormData {
    nombre: string
    duracion: string
    precio: string
    notas: string
}

export const useServiceForm = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
        control,
    } = useForm<ServiceFormData>({
        defaultValues: {
            nombre: "",
            duracion: "",
            precio: "",
            notas: "",
        },
    })

    const { mutateAsync: createServiceAsync, isPending: isCreating } = useCreateService()
    // const { mutateAsync: updateServiceAsync, isPending: isUpdating } = useUpdateService()
    const { user } = useAuthStore()

    /**
     * Maneja el envío del formulario
     */
    const onSubmit = async (data: ServiceFormData) => {
        const payload = {
            name: data.nombre,
            duration: data.duracion,
            price: data.precio,
            notes: data.notas,
            createdBy: user?.id || "",
        }

        try {
            if (editingService) {
                // TODO: implementar updateService cuando exista la mutación
                // await updateService({ id: editingService.id, clientData: payload })
                // toast.success("Servicee actualizado exitosamente", {
                //     description: `El servicio "${data.nombre}" ha sido actualizado correctamente.`,
                // })
            } else {
                // Usamos mutateAsync para esperar el resultado y manejar errores
                await createServiceAsync(payload)

                toast.success("Servicio creado exitosamente", {
                    description: `El servicio "${data.nombre}" ha sido creado correctamente.`,
                })
            }

            // Cerrar el modal y resetear el formulario solo si todo fue exitoso
            setIsDialogOpen(false)
            reset()
        } catch (error) {
            // Normalizar y formatear mensaje para el usuario
            const err = error as unknown
            console.error("Error al guardar el servicio:", err)

            const formatted = formatServerError(err, { entity: "servicio" })

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
        setEditingService(null)
        reset()
        setIsDialogOpen(true)
    }

    /**
    * Abre el modal del formulario para editar un servicio existente
    */
    const openEditDialog = (service: Service) => {
        setEditingService(service)
        setValue("nombre", service.name)
        setValue("duracion", service.duration)
        setValue("precio", service.price)
        setValue("notas", service.notes)
        setIsDialogOpen(true)
    }

    /**
     * Cierra el modal del formulario
     */
    const closeDialog = () => {
        setIsDialogOpen(false)
        setEditingService(null)
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
        isSubmitting: isSubmitting || isCreating /* || isUpdating */,
        reset,
        watch,
        control,
        editingService,
    }
}
