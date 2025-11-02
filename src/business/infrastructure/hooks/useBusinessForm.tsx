import { useForm } from "react-hook-form"
import { useUpdateBusiness } from "./useUpdateBusiness"
import { toast } from "sonner"
import { useAuthStore } from "@/auth/store/auth.store"
import formatServerError from "@/shared/lib/formatServerError"
import type { Business } from "@/business/domain/entities/business.entity"

export interface BusinessFormData {
    nombre: string
    descripcion: string
    telefono: string
    email: string
    direccion: string
    logo?: File
}

export const useBusinessForm = (props: Business | undefined) => {
    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
        control,
    } = useForm<BusinessFormData>({
        values: {
            nombre: props?.name ?? '',
            descripcion: props?.description ?? '',
            telefono: props?.phone ?? '',
            email: props?.email ?? '',
            direccion: props?.address ?? '',
        },
    })

    const { mutateAsync: updateBusinessAsync, isPending: isUpdating } = useUpdateBusiness()
    const { user } = useAuthStore()

    /**
     * Maneja el envío del formulario
     */
    const onSubmit = async (data: BusinessFormData) => {
        const payload = {
            name: data.nombre,
            description: data.descripcion,
            phone: data.telefono,
            email: data.email,
            address: data.direccion,
            logo: data.logo,
            createdBy: user?.id ?? "",
        }

        console.log(payload)

        try {
            await updateBusinessAsync({ data: payload })
            toast.success("Negocio actualizado exitosamente", {
                description: `Los datos de "${data.nombre}" han sido actualizados correctamente.`,
            })

        } catch (error) {
            // Normalizar y formatear mensaje para el usuario
            const err = error as unknown
            console.error("Error al actualizar el negocio:", err)

            const formatted = formatServerError(err, { entity: "negocio" })

            // Mostrar toast de error con título y descripción en español
            if (formatted.description) {
                toast.error(formatted.title, { description: formatted.description })
            } else {
                toast.error(formatted.title)
            }
        }
    }

    return {
        setValue,
        register,
        handleSubmit: handleFormSubmit(onSubmit),
        errors,
        isSubmitting: isSubmitting || isUpdating,
        reset,
        watch,
        control,
    }
}
