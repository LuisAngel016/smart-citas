import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useAuthStore } from "@/auth/store/auth.store"

export interface RegisterFormData {
    name: string
    phone?: string
    email: string
    password: string
}

export const useRegisterForm = () => {
    const navigate = useNavigate()

    const {
        register,
        control,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<RegisterFormData>({
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
        },
    })

    // El store expone una acción llamada `register` (conflicto de nombre con react-hook-form)
    const { register: registerAction } = useAuthStore()

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const ok = await registerAction(data.email, data.password, data.name)
            if (ok) {
                reset()
                navigate("/admin")
            } else {
                toast.error("No se pudo crear la cuenta. Revisa tus datos e intenta nuevamente.")
            }
        } catch (error) {
            console.error("Error al registrar usuario:", error)
            toast.error("No se pudo crear la cuenta. Revisa tus datos e intenta nuevamente.")
        }
    }

    return {
        register,
        handleSubmit: handleFormSubmit(onSubmit),
        errors,
        isSubmitting,
        control,
        reset,
        watch,
    }
}
