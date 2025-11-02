import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateSchedule } from "./useUpdateSchedule";
import type { UpdateScheduleDTO } from "@/schedules/domain/domain/interfaces/create-schedule.dto";
import formatServerError from "@/shared/lib/formatServerError";

interface ScheduleFormData {
    schedules: UpdateScheduleDTO[];
}

export const useScheduleForm = (initialData?: UpdateScheduleDTO[]) => {
    const { mutateAsync: updateSchedulesAsync, isPending } = useUpdateSchedule();

    const { control, handleSubmit, watch, reset } = useForm<ScheduleFormData>({
        values: {
            schedules: initialData ?? [],
        },
    });

    /**
     * Maneja el envío del formulario
     */
    const onSubmit = async (data: ScheduleFormData) => {
        try {
            // Filtrar y preparar los datos para enviar
            const schedulesToUpdate: UpdateScheduleDTO[] = data.schedules.map((schedule) => ({
                day: schedule.day,
                enabled: schedule.enabled,
                start: schedule.enabled ? schedule.start : undefined,
                end: schedule.enabled ? schedule.end : undefined,
            }));

            await updateSchedulesAsync(schedulesToUpdate);

            toast.success("Horarios actualizados exitosamente", {
                description: "Los horarios de atención han sido guardados correctamente.",
            });
        } catch (error) {
            console.error("Error al actualizar horarios:", error);

            const formatted = formatServerError(error as unknown, { entity: "horario" });

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