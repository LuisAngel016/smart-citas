import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useAuthStore } from "@/auth/store/auth.store"

export interface LoginFormData {
    email: string
    password: string
}

export const useLoginForm = () => {

    const navigate = useNavigate();

    const {
        register,
        control,
        handleSubmit: handleFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { login } = useAuthStore();


    const onSubmit = async (data: LoginFormData) => {
        try {

            await login(data.email, data.password);

            navigate('/admin')

            reset()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error al iniciar sesión:", error)
            toast.error("No se pudo iniciar sesión. Revisa tus credenciales e intenta nuevamente.")
        }
    }

    return {
        register,
        handleSubmit: handleFormSubmit(onSubmit),
        errors,
        isSubmitting: isSubmitting,
        control,
        reset,
        watch,
    }
}
