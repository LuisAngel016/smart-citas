import { useState } from "react"
import { useForm } from "react-hook-form"
import { useCreateClient } from "./useCreateClient"
import type { Client } from "@/clients/domain/domain/entities/client.entity"
import { toast } from "sonner"
import { useAuthStore } from "@/auth/store/auth.store"
import formatServerError from "@/shared/lib/formatServerError"
import { useUpdateClient } from "./useUpdateClient"

export interface ClientFormData {
    nombre: string
    email: string
    telefono: string
    direccion: string
    identificacion: string
}

export const useClientForm = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
        control,
    } = useForm<ClientFormData>({
        defaultValues: {
            nombre: "",
            email: "",
            telefono: "",
            direccion: "",
            identificacion: "",
        },
    })

    const { mutateAsync: createClientAsync, isPending: isCreating } = useCreateClient()
    const { mutateAsync: updateClientAsync, isPending: isUpdating } = useUpdateClient()
    const { user } = useAuthStore()

    /**
     * Maneja el envío del formulario
     */
    const onSubmit = async (data: ClientFormData) => {
        const payload = {
            name: data.nombre,
            email: data.email,
            phone: data.telefono,
            address: data.direccion,
            identification: data.identificacion,
            createdBy: user!.id,
        }

        try {
            if (editingClient) {
                await updateClientAsync({ id: editingClient.id, clientData: payload })
                toast.success("Cliente actualizado exitosamente", {
                    description: `El cliente "${data.nombre}" ha sido actualizado correctamente.`,
                })
            } else {
                // Usamos mutateAsync para esperar el resultado y manejar errores
                await createClientAsync(payload)

                toast.success("Cliente creado exitosamente", {
                    description: `El cliente "${data.nombre}" ha sido creado correctamente.`,
                })
            }

            // Cerrar el modal y resetear el formulario solo si todo fue exitoso
            setIsDialogOpen(false)
            reset()
        } catch (error) {
            // Normalizar y formatear mensaje para el usuario
            const err = error as unknown
            console.error("Error al guardar el cliente:", err)

            const formatted = formatServerError(err, { entity: "cliente" })

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
        setEditingClient(null)
        reset()
        setIsDialogOpen(true)
    }

    /**
    * Abre el modal del formulario para editar un cliente existente
    */
    const openEditDialog = (client: Client) => {
        setEditingClient(client)
        setValue("nombre", client.name)
        setValue("email", client.email)
        setValue("telefono", client.phone)
        setValue("direccion", client.address)
        setValue("identificacion", client.identification)
        setIsDialogOpen(true)
    }

    /**
     * Cierra el modal del formulario
     */
    const closeDialog = () => {
        setIsDialogOpen(false)
        setEditingClient(null)
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
        isSubmitting: isSubmitting || isCreating || isUpdating,
        reset,
        watch,
        control,
        editingClient,
    }
}
