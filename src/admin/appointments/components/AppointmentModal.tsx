"use client"

import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, User, Phone, Mail, Sparkles } from "lucide-react"
import { Calendar as DatePicker } from "@/components/ui/calendar"
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
import type { UseFormRegister, FieldErrors, Control } from "react-hook-form"
import { Controller } from "react-hook-form"
import { format, startOfDay } from "date-fns"
import { useState, useRef, useEffect } from "react"
import type { AppointmentFormData } from "@/admin/appointments/interfaces/appointment.interface"

interface AppointmentModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    register: UseFormRegister<AppointmentFormData>
    control: Control<AppointmentFormData>
    errors: FieldErrors<AppointmentFormData>
    onSubmit: () => void
    isSubmitting?: boolean
}

export const AppointmentModal = ({
    open,
    onOpenChange,
    register,
    control,
    errors,
    onSubmit,
    isSubmitting = false,
}: AppointmentModalProps) => {
    const [openDate, setOpenDate] = useState(false)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px] font-poppins border-0 p-0 overflow-visible bg-white">
                <div className="relative">
                    <DialogHeader className="px-8 pt-8 pb-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary shadow-lg shadow-primary/20">
                                <Sparkles className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-foreground">Nueva Cita</DialogTitle>
                        </div>
                        <DialogDescription className="text-base text-muted-foreground">
                            Completa los datos para agendar una nueva cita
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit}>
                        <div className="px-8 pb-6 space-y-6">
                            {/* Nombre y Teléfono */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2.5">
                                    <Label htmlFor="clientName" className="text-sm font-medium flex items-center gap-2">
                                        <div className="p-1 rounded-md bg-primary/10">
                                            <User className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        Nombre del Cliente
                                    </Label>
                                    <Input
                                        id="clientName"
                                        placeholder="Ej: Juan Pérez"
                                        className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white"
                                        {...register("clientName", {
                                            required: "El nombre del cliente es requerido",
                                            minLength: {
                                                value: 3,
                                                message: "El nombre debe tener al menos 3 caracteres",
                                            },
                                        })}
                                    />
                                    {errors.clientName && (
                                        <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                            {errors.clientName.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="clientPhone" className="text-sm font-medium flex items-center gap-2">
                                        <div className="p-1 rounded-md bg-primary/10">
                                            <Phone className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        Teléfono
                                    </Label>
                                    <Input
                                        id="clientPhone"
                                        type="tel"
                                        placeholder="Ej: +52 123 456 7890"
                                        className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white"
                                        {...register("clientPhone", {
                                            required: "El teléfono es requerido",
                                            pattern: {
                                                value: /^[+]?[\d\s-()]+$/,
                                                message: "Formato de teléfono inválido",
                                            },
                                        })}
                                    />
                                    {errors.clientPhone && (
                                        <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                            {errors.clientPhone.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Correo Electrónico */}
                            <div className="space-y-2.5">
                                <Label htmlFor="clientEmail" className="text-sm font-medium flex items-center gap-2">
                                    <div className="p-1 rounded-md bg-primary/10">
                                        <Mail className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    Correo Electrónico
                                </Label>
                                <Input
                                    id="clientEmail"
                                    type="email"
                                    placeholder="Ej: cliente@ejemplo.com"
                                    className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white"
                                    {...register("clientEmail", {
                                        required: "El email es requerido",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Correo electrónico inválido",
                                        },
                                    })}
                                />
                                {errors.clientEmail && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                        {errors.clientEmail.message}
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
                                                    className="w-full h-11 text-left pl-4 pr-3 rounded-lg border border-border/70 bg-white text-sm flex hover:bg-accent hover:border-primary/50 text-foreground items-center justify-between transition-all duration-200"
                                                >
                                                    <span className={!field.value ? "text-muted-foreground" : ""}>
                                                        {field.value ? format(new Date(field.value), "PPP") : "Seleccionar fecha"}
                                                    </span>
                                                    <CalendarIcon className="ml-2 h-4 w-4 opacity-60" />
                                                </Button>
                                                {openDate && (
                                                    <div className="absolute left-0 mt-2 z-50 w-auto p-3 bg-popover rounded-xl shadow-2xl border border-border/70 animate-in fade-in-0 zoom-in-95">
                                                        <DatePicker
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : undefined}
                                                            onSelect={(d) => {
                                                                field.onChange(d ? d.toISOString().slice(0, 10) : "")
                                                                setOpenDate(false)
                                                            }}
                                                            disabled={(date) => date < startOfDay(new Date())}
                                                            captionLayout="dropdown"
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
                                    <Input
                                        id="time"
                                        type="time"
                                        className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white"
                                        {...register("time", {
                                            required: "La hora es requerida",
                                        })}
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
                                <Input
                                    id="service"
                                    placeholder="Ej: Corte de cabello"
                                    className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white"
                                    {...register("service", {
                                        required: "El servicio es requerido",
                                    })}
                                />
                                {errors.service && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                        {errors.service.message}
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
                                    className="resize-none border-border/70 focus:border-primary transition-all duration-200 bg-white"
                                    {...register("notes")}
                                />
                            </div>
                        </div>

                        <DialogFooter className="px-8 py-6 bg-muted/30 border-t border-border/70">
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    disabled={isSubmitting}
                                    className="flex-1 sm:flex-none h-11 border-border/70 hover:bg-accent transition-all duration-200"
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
                                            Guardando...
                                        </span>
                                    ) : (
                                        "Guardar Cita"
                                    )}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
