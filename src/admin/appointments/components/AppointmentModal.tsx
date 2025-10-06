import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Phone, Mail } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { AppointmentFormData } from "@/admin/appointments/interfaces/appointment.interface"

interface AppointmentModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    register: UseFormRegister<AppointmentFormData>
    errors: FieldErrors<AppointmentFormData>
    onSubmit: () => void
    isSubmitting?: boolean
}

export const AppointmentModal = ({
    open,
    onOpenChange,
    register,
    errors,
    onSubmit,
    isSubmitting = false,
}: AppointmentModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] font-poppins">
                <DialogHeader>
                    <DialogTitle>Nueva Cita</DialogTitle>
                    <DialogDescription>
                        Completa los datos para agendar una nueva cita
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Nombre y Teléfono */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="clientName">
                                    <User className="h-4 w-4 inline mr-2" />
                                    Nombre del Cliente
                                </Label>
                                <Input
                                    id="clientName"
                                    placeholder="Ej: Juan Pérez"
                                    {...register("clientName", {
                                        required: "El nombre del cliente es requerido",
                                        minLength: {
                                            value: 3,
                                            message: "El nombre debe tener al menos 3 caracteres"
                                        }
                                    })}
                                />
                                {errors.clientName && (
                                    <p className="text-sm text-red-500">{errors.clientName.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="clientPhone">
                                    <Phone className="h-4 w-4 inline mr-2" />
                                    Teléfono
                                </Label>
                                <Input
                                    id="clientPhone"
                                    type="tel"
                                    placeholder="Ej: +52 123 456 7890"
                                    {...register("clientPhone", {
                                        required: "El teléfono es requerido",
                                        pattern: {
                                            value: /^[+]?[\d\s-()]+$/,
                                            message: "Formato de teléfono inválido"
                                        }
                                    })}
                                />
                                {errors.clientPhone && (
                                    <p className="text-sm text-red-500">{errors.clientPhone.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Correo Electrónico */}
                        <div className="space-y-2">
                            <Label htmlFor="clientEmail">
                                <Mail className="h-4 w-4 inline mr-2" />
                                Correo Electrónico
                            </Label>
                            <Input
                                id="clientEmail"
                                type="email"
                                placeholder="Ej: cliente@ejemplo.com"
                                {...register("clientEmail", {
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Correo electrónico inválido"
                                    }
                                })}
                            />
                            {errors.clientEmail && (
                                <p className="text-sm text-red-500">{errors.clientEmail.message}</p>
                            )}
                        </div>

                        {/* Servicio */}
                        <div className="space-y-2">
                            <Label htmlFor="service">Servicio</Label>
                            <Input
                                id="service"
                                placeholder="Ej: Corte de cabello"
                                {...register("service", {
                                    required: "El servicio es requerido"
                                })}
                            />
                            {errors.service && (
                                <p className="text-sm text-red-500">{errors.service.message}</p>
                            )}
                        </div>

                        {/* Fecha y Hora */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">
                                    <Calendar className="h-4 w-4 inline mr-2" />
                                    Fecha
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    {...register("date", {
                                        required: "La fecha es requerida"
                                    })}
                                />
                                {errors.date && (
                                    <p className="text-sm text-red-500">{errors.date.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">
                                    <Clock className="h-4 w-4 inline mr-2" />
                                    Hora
                                </Label>
                                <Input
                                    id="time"
                                    type="time"
                                    {...register("time", {
                                        required: "La hora es requerida"
                                    })}
                                />
                                {errors.time && (
                                    <p className="text-sm text-red-500">{errors.time.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Notas */}
                        <div className="space-y-2">
                            <Label htmlFor="notes">Notas (Opcional)</Label>
                            <Textarea
                                id="notes"
                                placeholder="Información adicional sobre la cita..."
                                rows={3}
                                {...register("notes")}
                            />
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Guardando..." : "Guardar Cita"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
