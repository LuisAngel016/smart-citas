import type { Client } from "@/clients/domain/domain/entities/client.entity";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteClient } from "./useDeleteClient";

export const useDeleteClientDialog = () => {
    const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const { mutateAsync: deleteClient, isPending: isDeleting } = useDeleteClient();

    const handleDeleteClick = (client: Client) => {
        setClientToDelete(client);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!clientToDelete?.id) return;

        try {
            await deleteClient(clientToDelete.id);
            toast.success("Cliente eliminado exitosamente", {
                description: `El cliente "${clientToDelete.name}" ha sido eliminado correctamente.`,
            });
            setIsDeleteDialogOpen(false);
            setClientToDelete(null);
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
            toast.error("Error al eliminar el cliente", {
                description: "No se pudo eliminar el cliente. Por favor, intenta nuevamente.",
            });
        }
    };

    return {
        clientToDelete,
        setClientToDelete,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleDeleteClick,
        handleConfirmDelete,
        isDeleting,
    } as const;
};
