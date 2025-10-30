"use client"

import { useState, useRef, useEffect } from "react"
import { format, startOfDay, parse, isValid } from "date-fns"
import type { UseFormRegister, FieldErrors, Control, SetValueConfig, UseFormWatch } from "react-hook-form"
import { Controller } from "react-hook-form"
import { CalendarIcon, Clock, Mail, Sparkles, Edit, Trash2 } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Calendar } from "@/shared/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import type { AppointmentFormData } from "@/appointments/infrastructure/hooks/useAppointmentForm"
import type { Appointment } from "@/appointments/domain/entities/appointment.entity"
import { useDeleteAppointmentDialog } from "@/appointments/infrastructure/hooks/useDeleteAppointmentDialog"
import { useGetClients } from "@/clients/infrastructure/hooks/useGetClients"
import { useGetServices } from "@/services/infrastructure/hooks/useGetServices"
import CustomSelect from "@/shared/components/custom/CustomSelect"
import { TimePicker } from "@/shared/components/custom"
import { DeleteConfirmationModal } from "@/shared/components/custom/DeleteConfirmationModal"

interface AppointmentModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    register: UseFormRegister<AppointmentFormData>
    control: Control<AppointmentFormData>
    watch: UseFormWatch<AppointmentFormData>
    errors: FieldErrors<AppointmentFormData>
    setValue: (name: keyof AppointmentFormData, value: AppointmentFormData[keyof AppointmentFormData], options?: SetValueConfig) => void
    onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
    isSubmitting?: boolean
    editingAppointment: Appointment | null
}

export const AppointmentModal = ({
    open,
    onOpenChange,
    register,
    control,
    watch,
    errors,
    setValue,
    onSubmit,
    isSubmitting = false,
    editingAppointment,

}: AppointmentModalProps) => {
    const [openDate, setOpenDate] = useState(false)
    // usar hook de diálogo de eliminación
    const {
        appointmentToDelete,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleDeleteClick,
        handleConfirmDelete,
        isDeleting,
    } = useDeleteAppointmentDialog()
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const { data: clients } = useGetClients()
    const { data: services } = useGetServices()

    const isEditing = !!editingAppointment

    // Obtener valores actuales del formulario
    const idClient = watch("idClient")
    const idService = watch("idService")

    // Obtener nombres para el modal de eliminación
    const clientName = clients?.data.find(c => c.id === idClient)?.name
    const serviceName = services?.data.find(s => s.id === idService)?.name
    const appointmentName = clientName && serviceName ? `${clientName} - ${serviceName}` : "esta cita"


    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!wrapperRef.current) return
            if (e.target instanceof Node && !wrapperRef.current.contains(e.target)) {
                setOpenDate(false)
            }
        }
        document.addEventListener("mousedown", onDoc)
        return () => document.removeEventListener("mousedown", onDoc)
    }, [])

    // Handler para confirmar eliminación y cerrar el modal padre
    const handleConfirmDeleteAndClose = async () => {
        await handleConfirmDelete()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px] font-poppins border-0 p-0 overflow-auto max-h-[90vh] bg-white dark:bg-gray-800">
                <div className="relative">
                    <DialogHeader className="px-8 pt-8 pb-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary shadow-lg shadow-primary/20">
                                {isEditing ? (
                                    <Edit className="h-5 w-5 text-primary-foreground" />
                                ) : (
                                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                                )}
                            </div>
                            <DialogTitle className="text-2xl font-bold text-foreground dark:text-gray-100">
                                {isEditing ? "Editar Cita" : "Nueva Cita"}
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-base text-muted-foreground dark:text-gray-400">
                            {isEditing
                                ? "Actualiza los datos de la cita"
                                : "Completa los datos para agendar una nueva cita"
                            }
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit}>
                        <div className="px-8 pb-6 space-y-6">
                            {/* Cliente */}
                            <div className="space-y-2.5">
                                <Label htmlFor="idClient" className="text-sm font-medium flex items-center gap-2">
                                    <div className="p-1 rounded-md bg-primary/10">
                                        <Mail className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    Cliente
                                </Label>
                                <CustomSelect
                                    control={control}
                                    name="idClient"
                                    options={clients?.data.map(client => ({
                                        value: client.id,
                                        label: client.name
                                    })) ?? []}
                                    placeholder="Seleccionar cliente"
                                    isClearable
                                    required={true}
                                    onChange={(selected) => {
                                        setValue("idClient", selected?.value ?? "");
                                    }}
                                />
                                {errors.idClient && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                        {errors.idClient.message}
                                    </p>
                                )}
                            </div>

                            {/* Fecha y Hora */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2.5" ref={wrapperRef}>
                                    <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                                        <div className="p-1 rounded-md bg-primary/10">
                                            <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        Fecha
                                    </Label>
                                    <Controller
                                        control={control}
                                        name="date"
                                        rules={{ required: "La fecha es requerida" }}
                                        render={({ field }) => (
                                            <div className="relative">
                                                <Button
                                                    type="button"
                                                    onClick={() => setOpenDate((v) => !v)}
                                                    variant="outline"
                                                    className="w-full h-11 text-left pl-4 pr-3 rounded-lg border-border/70 bg-background hover:bg-accent hover:border-primary/50 text-foreground flex items-center justify-between transition-all duration-200"
                                                >
                                                    <span className={!field.value ? "text-muted-foreground" : ""}>
                                                        {(() => {
                                                            if (typeof field.value === "string" && field.value) {
                                                                const parsed = parse(field.value, "yyyy-MM-dd", new Date())
                                                                return isValid(parsed) ? format(parsed, "PPP") : "Seleccionar fecha"
                                                            }
                                                            return "Seleccionar fecha"
                                                        })()}
                                                    </span>
                                                    <CalendarIcon className="ml-2 h-4 w-4 opacity-60" />
                                                </Button>
                                                {openDate && (
                                                    <div className="absolute left-0 mt-2 z-50 w-auto p-3 bg-popover rounded-xl shadow-2xl border border-border/70 animate-in fade-in-0 zoom-in-95">
                                                        <Calendar
                                                            mode="single"
                                                            selected={
                                                                typeof field.value === "string" && field.value
                                                                    ? (() => {
                                                                        const p = parse(field.value, "yyyy-MM-dd", new Date())
                                                                        return isValid(p) ? p : undefined
                                                                    })()
                                                                    : undefined
                                                            }
                                                            onSelect={(d) => {
                                                                field.onChange(d ? format(d, "yyyy-MM-dd") : "")
                                                                setOpenDate(false)
                                                            }}
                                                            disabled={(date) => date < startOfDay(new Date())}

                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    />
                                    {errors.date && (
                                        <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                            {errors.date.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2.5">
                                    <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
                                        <div className="p-1 rounded-md bg-primary/10">
                                            <Clock className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        Hora
                                    </Label>
                                    <Controller
                                        control={control}
                                        name="time"
                                        rules={{ required: "La hora es requerida" }}
                                        render={({ field }) => (
                                            <TimePicker value={field.value} onChange={field.onChange} className="bg-background" />
                                        )}
                                    />
                                    {errors.time && (
                                        <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                            {errors.time.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Servicio */}
                            <div className="space-y-2.5">
                                <Label htmlFor="service" className="text-sm font-medium flex items-center gap-2">
                                    <div className="p-1 rounded-md bg-primary/10">
                                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    Servicio
                                </Label>
                                <CustomSelect
                                    control={control}
                                    name="idService"
                                    options={services?.data.map(service => ({
                                        value: service.id,
                                        label: service.name
                                    })) ?? []}
                                    placeholder="Seleccionar servicio"
                                    isClearable
                                    required={true}
                                    onChange={(selected) => {
                                        setValue("idService", selected?.value ?? "");
                                    }}
                                />
                                {errors.idService && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                        {errors.idService.message}
                                    </p>
                                )}
                            </div>

                            {/* Notas */}
                            <div className="space-y-2.5">
                                <Label htmlFor="notes" className="text-sm font-medium">
                                    Notas (Opcional)
                                </Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Información adicional sobre la cita..."
                                    rows={3}
                                    className="resize-none font-thin border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                                    {...register("notes")}
                                />
                            </div>
                        </div>

                        <DialogFooter className="px-8 py-6 bg-muted/30 dark:bg-gray-900/50 border-t border-border/70 dark:border-gray-700">
                            <div className="flex gap-3 w-full sm:justify-between">
                                {/* Botón de eliminar a la izquierda (solo en modo edición) */}
                                {isEditing && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            // abrir diálogo de eliminación con la cita actual
                                            if (editingAppointment) handleDeleteClick(editingAppointment as Appointment)
                                        }}
                                        disabled={isSubmitting}
                                        className="h-11 border-destructive/70 text-destructive hover:bg-destructive/10 hover:border-destructive dark:border-destructive/50 dark:hover:bg-destructive/20 transition-all duration-200"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}

                                {/* Botones de acción a la derecha */}
                                <div className="flex gap-3 flex-1 sm:flex-none sm:ml-auto">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => onOpenChange(false)}
                                        disabled={isSubmitting}
                                        className="flex-1 sm:flex-none h-11 border-border/70 hover:bg-accent dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 sm:flex-none h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                {isEditing ? "Actualizando..." : "Guardando..."}
                                            </span>
                                        ) : (
                                            isEditing ? "Actualizar Cita" : "Guardar Cita"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>

            {/* Modal de confirmación de eliminación */}
            <DeleteConfirmationModal
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                itemName={appointmentToDelete ? `${appointmentToDelete.clientName} - ${appointmentToDelete.serviceName}` : appointmentName}
                itemType="cita"
                onConfirm={handleConfirmDeleteAndClose}
                isDeleting={isDeleting}
            />
        </Dialog>
    )
}