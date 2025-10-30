import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateScheduleSlotDuration } from "./useUpdateScheduleSlotDuration";
import formatServerError from "@/shared/lib/formatServerError";
import type { UpdateSlotDurationDTO } from "@/schedules/domain/domain/interfaces/slot-duration.interface";

interface SlotDurationFormData {
    slotDuration: number;
}

export const useSlotDurationForm = (initialData?: number) => {
    const { mutateAsync: updateSlotDurationAsync, isPending } = useUpdateScheduleSlotDuration();

    const { control, handleSubmit, watch, reset } = useForm<SlotDurationFormData>({
        defaultValues: {
            slotDuration: initialData || 15,
        },
    });

    /**
     * Maneja el envío del formulario
     */
    const onSubmit = async (data: SlotDurationFormData) => {
        try {
            // Validación básica
            if (!data.slotDuration || data.slotDuration < 15) {
                toast.error("Duración inválida", {
                    description: "La duración mínima debe ser de 15 minutos."
                });
                return;
            }

            const payload: UpdateSlotDurationDTO = {
                slotDuration: data.slotDuration
            };

            await updateSlotDurationAsync(payload);

            toast.success("Duración actualizada exitosamente", {
                description: `Duración de ${payload.slotDuration} minutos guardada correctamente.`,
            });
        } catch (error) {
            console.error("Error al actualizar duración de slots:", error);

            const formatted = formatServerError(error as unknown, {
                entity: "duración de slots"
            });

            if (formatted.description) {
                toast.error(formatted.title, { description: formatted.description });
            } else {
                toast.error(formatted.title);
            }
        }
    };

    return {
        control,
        handleSubmit: handleSubmit(onSubmit),
        isSubmitting: isPending,
        watch,
        reset,
    };
};