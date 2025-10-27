import type { Service } from "@/services/domain/entities/service.entity";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteService } from "./useDeleteService";

export const useDeleteServiceDialog = () => {
    const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const { mutateAsync: deleteService, isPending: isDeleting } = useDeleteService();

    const handleDeleteClick = (service: Service) => {
        setServiceToDelete(service);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!serviceToDelete?.id) return;

        try {
            await deleteService(serviceToDelete.id);
            toast.success("Servicio eliminado exitosamente", {
                description: `El servicio "${serviceToDelete.name}" ha sido eliminado correctamente.`,
            });
            setIsDeleteDialogOpen(false);
            setServiceToDelete(null);
        } catch (error) {
            console.error("Error al eliminar el servicio:", error);
            toast.error("Error al eliminar el servicio", {
                description: "No se pudo eliminar el servicio. Por favor, intenta nuevamente.",
            });
        }
    };

    return {
        serviceToDelete,
        setServiceToDelete,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleDeleteClick,
        handleConfirmDelete,
        isDeleting,
    } as const;
};
