import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useGetUserById } from "./useGetUserById";
import { useAuthStore } from "@/auth/store/auth.store";
import useUpdateUser from "./useUpdateUser";
import formatServerError from "@/shared/lib/formatServerError";

type FormValues = {
    name: string;
    email: string;
    phone?: string;
    imageUrl?: string | File;
    location?: string;
    bio?: string;
};

export const useUserForm = () => {
    const authStore = useAuthStore();
    const userId = authStore.user?.id;

    const { data: user, isLoading } = useGetUserById(userId);

    const { mutateAsync: updateUserAsync, isPending: isUpdating } = useUpdateUser();

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit: handleFormSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            imageUrl: "",
            location: "",
            bio: "",
        },
    });

    // When the user data is fetched, populate the form
    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                phone: user.phone ?? "",
                imageUrl: user.imageUrl ?? "",
                location: user.location ?? "",
                bio: user.bio ?? "",
            });

            // Set initial image preview if exists
            if (user.imageUrl) {
                setImagePreview(user.imageUrl);
            }
        }
    }, [user, reset]);

    const handleImageChange = (file: File | null) => {
        setSelectedImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: FormValues) => {
        if (!userId) return;

        const payload = {
            fullName: data.name,
            email: data.email,
            phone: data.phone,
            imageUrl: selectedImage || data.imageUrl,
            location: data.location,
            bio: data.bio,
        };

        try {
            await updateUserAsync({ id: userId, data: payload });
            toast.success("Perfil actualizado exitosamente", {
                description: `Los datos de "${data.name}" han sido actualizados correctamente.`,
            });
        } catch (error) {
            const err = error as unknown;
            console.error("Error al actualizar el usuario:", err);

            const formatted = formatServerError(err, { entity: "usuario" });

            if (formatted.description) {
                toast.error(formatted.title, { description: formatted.description });
            } else {
                toast.error(formatted.title);
            }
        }
    };

    return {
        register,
        handleSubmit: handleFormSubmit(onSubmit),
        errors,
        isSubmitting: isSubmitting || isUpdating,
        setValue,
        watch,
        user,
        isLoading,
        imagePreview,
        handleImageChange,
    };
};

export default useUserForm;
