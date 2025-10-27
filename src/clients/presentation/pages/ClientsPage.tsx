// import { useSearchParams } from "react-router"
import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"
import { useClientForm } from "@/clients/infrastructure/hooks/useClientForm"
import { ClientModal } from "../components/ClientModal"
import { useGetClients } from "@/clients/infrastructure/hooks/useGetClients"
import { DataTable } from "@/shared/components/DataTable"
import { createColumns } from "../components/Columns"
import { useMemo } from "react"
import { useDeleteClientDialog } from "@/clients/infrastructure/hooks/useDeleteClientDialog"
import { DeleteModal } from "../components/DeleteModal"
import { ClientsLoadingSkeleton } from "../components/ClientsLoadingSkeleton"

export const ClientsPage = () => {

    // const [searchParams,] = useSearchParams();

    // const query = searchParams.get("query")

    const { data: clients, isLoading } = useGetClients();

    const {
        clientToDelete,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleDeleteClick,
        handleConfirmDelete,
        isDeleting,
    } = useDeleteClientDialog();

    const {
        isDialogOpen,
        openDialog,
        openEditDialog,
        setIsDialogOpen,
        register,
        handleSubmit,
        errors,
        isSubmitting,
        control,
        editingClient
    } = useClientForm()


    const columns = useMemo(() => createColumns(openEditDialog, handleDeleteClick), [openEditDialog, handleDeleteClick]);

    if (isLoading) {
        return <ClientsLoadingSkeleton />;
    }

    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animation-duration-[800ms] animate-delay-100">
            <div className="flex items-center justify-between bg-white rounded-xl shadow p-4 dark:bg-gray-800">
                <div>
                    <h1 className="text-3xl font-bold text-foreground dark:text-gray-100">Clientes</h1>
                    <p className="text-muted-foreground dark:text-gray-400 mt-1">Gestiona tu base de clientes</p>
                </div>
                <Button onClick={openDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Cliente
                </Button>
            </div>

            <DataTable columns={columns} data={clients?.data || []} />

            <ClientModal
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                register={register}
                control={control}
                errors={errors}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                editingClient={editingClient}
            />

            <DeleteModal
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                client={clientToDelete}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
                label={"Cliente"}
            />
        </div>
    )
}
