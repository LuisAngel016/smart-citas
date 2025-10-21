"use client"

import { Button } from "@/shared/components/ui/button"
import { User, Phone, Mail, MapPin } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import type { UseFormRegister, FieldErrors } from "react-hook-form"

interface ClientModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    register: UseFormRegister<any>
    errors: FieldErrors<any>
    onSubmit: () => void
    isSubmitting?: boolean
}

export const ClientModal = ({
    open,
    onOpenChange,
    register,
    errors,
    onSubmit,
    isSubmitting = false,
}: ClientModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] font-poppins border-0 p-0 overflow-hidden bg-white dark:bg-gray-800">
                <div className="relative">
                    <DialogHeader className="px-8 pt-8 pb-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary shadow-lg shadow-primary/20">
                                <User className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-foreground dark:text-gray-100">Nuevo Cliente</DialogTitle>
                        </div>
                        <DialogDescription className="text-base text-muted-foreground dark:text-gray-400">
                            Completa los datos para registrar un nuevo cliente
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit}>
                        <div className="px-8 pb-6 space-y-6">
                            {/* Nombre */}
                            <div className="space-y-2.5">
                                <Label htmlFor="nombre" className="text-sm font-medium flex items-center gap-2">
                                    <div className="p-1 rounded-md bg-primary/10">
                                        <User className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    Nombre Completo
                                </Label>
                                <Input
                                    id="nombre"
                                    placeholder="Ej: María González"
                                    className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                    {...register("nombre", {
                                        required: "El nombre es requerido",
                                        minLength: {
                                            value: 3,
                                            message: "El nombre debe tener al menos 3 caracteres",
                                        },
                                    })}
                                />
                                {errors.nombre && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                        {errors.nombre.message}
                                    </p>
                                )}
                            </div>

                            {/* Email y Teléfono */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2.5">
                                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                        <div className="p-1 rounded-md bg-primary/10">
                                            <Mail className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        Correo Electrónico
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="maria@ejemplo.com"
                                        className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                        {...register("email", {
                                            required: "El correo es requerido",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Correo electrónico inválido",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="telefono" className="text-sm font-medium flex items-center gap-2">
                                        <div className="p-1 rounded-md bg-primary/10">
                                            <Phone className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        Teléfono
                                    </Label>
                                    <Input
                                        id="telefono"
                                        type="tel"
                                        placeholder="+52 123 456 7890"
                                        className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                        {...register("telefono", {
                                            required: "El teléfono es requerido",
                                            pattern: {
                                                value: /^[+]?[\d\s-()]+$/,
                                                message: "Formato de teléfono inválido",
                                            },
                                        })}
                                    />
                                    {errors.telefono && (
                                        <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                                            {errors.telefono.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Dirección */}
                            <div className="space-y-2.5">
                                <Label htmlFor="direccion" className="text-sm font-medium flex items-center gap-2">
                                    <div className="p-1 rounded-md bg-primary/10">
                                        <MapPin className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    Dirección (Opcional)
                                </Label>
                                <Input
                                    id="direccion"
                                    placeholder="Calle, número, colonia, ciudad"
                                    className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                    {...register("direccion")}
                                />
                            </div>

                            {/* Notas */}
                            <div className="space-y-2.5">
                                <Label htmlFor="notas" className="text-sm font-medium dark:text-gray-200">
                                    Notas (Opcional)
                                </Label>
                                <Textarea
                                    id="notas"
                                    placeholder="Información adicional sobre el cliente..."
                                    rows={3}
                                    className="resize-none border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                    {...register("notas")}
                                />
                            </div>
                        </div>

                        <DialogFooter className="px-8 py-6 bg-muted/30 dark:bg-gray-900/50 border-t border-border/70 dark:border-gray-700">
                            <div className="flex gap-3 w-full sm:w-auto">
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
                                            Guardando...
                                        </span>
                                    ) : (
                                        "Guardar Cliente"
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
