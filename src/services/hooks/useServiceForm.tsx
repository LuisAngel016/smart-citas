import { useState } from "react"
import { useForm } from "react-hook-form"


export const useServiceForm = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const {
        register,
        control,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm({
        defaultValues: {
            name: "",
            duration: "",
            price: "",
        },
    })

    const onSubmit = async (data: any) => {
        try {
            // const created = await createService(data)
            console.log("Nuevo servicio:", data)
            setIsDialogOpen(false)
            reset()
        } catch (error) {
            console.error("Error al crear servicio:", error)
            // fallback local
            // const fallback = { id: String(Date.now()), ...data }
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