"use client"

import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"
import { ServiceModal } from "../components/ServiceModal"
import { useServiceForm } from "@/services/infrastructure/hooks/useServiceForm"
import { useGetServices } from "@/services/infrastructure/hooks/useGetServices"
import { DataTable } from "@/shared/components/DataTable"
import { useMemo } from "react"
import { createColumns } from "../components/Columns"
import { ServicesLoadingSkeleton } from "../components/ServicesLoadingSkeleton"
import { useDeleteServiceDialog } from "@/services/infrastructure/hooks/useDeleteServiceDialog"
import { DeleteModal } from "../components/DeleteModal"

export const ServicesPage = () => {

    const { data: servicesData, isLoading } = useGetServices();
    const {
        serviceToDelete,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleDeleteClick,
        handleConfirmDelete,
        isDeleting,
    } = useDeleteServiceDialog();

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
        watch,
        editingService,
    } = useServiceForm()
    const columns = useMemo(() => createColumns(openEditDialog, handleDeleteClick), [openEditDialog, handleDeleteClick]);

    if (isLoading) {
        return <ServicesLoadingSkeleton />;
    }

    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animated-duration-[800ms] animate-delay-100">
            <div className="flex items-center justify-between bg-white rounded-xl shadow p-4 dark:bg-gray-800">
                <div>
                    <h1 className="text-3xl font-bold text-foreground dark:text-gray-100">Servicios</h1>
                    <p className="text-muted-foreground dark:text-gray-400 mt-1">Gestiona los servicios que ofreces</p>
                </div>
                <Button onClick={openDialog} className="font-medium">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Servicio
                </Button>
            </div>

            <DataTable columns={columns} data={servicesData?.data || []} />

            <ServiceModal
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                editingService={editingService}
            />

            <DeleteModal
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                service={serviceToDelete}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
                label={"Servicio"}
            />
        </div>
    )
}