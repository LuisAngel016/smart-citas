import { useState } from "react"
import { useForm } from "react-hook-form"
import type { ServiceInput, Service } from "../interfaces/service.interface"

type Options = {
    onCreated?: (service: Service) => void
}

export const useServiceForm = ({ onCreated }: Options = {}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const {
        register,
        control,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<ServiceInput>({
        defaultValues: {
            name: "",
            duration: "",
            price: 0,
        },
    })

    const onSubmit = async (data: ServiceInput) => {
        try {
            // const created = await createService(data)
            console.log("Nuevo servicio:", data)
            setIsDialogOpen(false)
            reset()
        } catch (error) {
            console.error("Error al crear servicio:", error)
            // fallback local
            const fallback = { id: String(Date.now()), ...data }
            onCreated?.(fallback)
            setIsDialogOpen(false)
            reset()
        }
    }

    const openDialog = () => setIsDialogOpen(true)
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