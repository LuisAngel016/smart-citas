"use client"

import { Button } from "@/shared/components/ui/button"
import { Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogFooter, DialogTitle } from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import type { UseFormRegister, FieldErrors, Control, UseFormWatch } from "react-hook-form"
import { Controller } from "react-hook-form"
import type { ServiceFormData } from "@/services/infrastructure/hooks/useServiceForm"
import formatPrice, { normalizePriceInput } from "@/shared/lib/formatPrice"

interface ServiceModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    register: UseFormRegister<ServiceFormData>
    errors: FieldErrors<ServiceFormData>
    // control y watch vienen del useForm para poder usar Controller / suscribirse a cambios
    control?: Control<ServiceFormData>
    watch?: UseFormWatch<ServiceFormData>
    onSubmit: () => void
    isSubmitting?: boolean
}

export const ServiceModal = ({
    open,
    onOpenChange,
    register,
    errors,
    control,
    watch,
    onSubmit,
    isSubmitting = false,
}: ServiceModalProps) => {
    // Observa el valor "precio" para mantener el valor mostrado formateado
    const precioRaw = watch ? watch("precio") : undefined

    const displayedPrecio = formatPrice(precioRaw)
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px] font-poppins border-0 p-0 overflow-visible bg-white dark:bg-gray-800">
                <div className="relative">
                    <DialogHeader className="px-8 pt-8 pb-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary shadow-lg shadow-primary/20">
                                <Sparkles className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-foreground dark:text-gray-100">Nuevo Servicio</DialogTitle>
                        </div>
                        <DialogDescription className="text-base text-muted-foreground dark:text-gray-400">
                            Completa los datos para registrar un nuevo servicio
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit}>
                        <div className="px-8 pb-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2.5">
                                    <Label htmlFor="nombre" className="text-sm font-medium dark:text-gray-200">Nombre del Servicio</Label>
                                    <Input
                                        {...register("nombre", { required: "El nombre es requerido" })}
                                        id="nombre"
                                    className="h-11 font-thin border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                                        placeholder="Corte de cabello" />
                                    {errors.nombre && <p className="text-xs text-red-500">{errors.nombre.message}</p>}
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="duracion" className="text-sm font-medium dark:text-gray-200">Duración</Label>
                                    <Input
                                        {...register("duracion", { required: "La duración es requerida" })}
                                        id="duracion"
                                    className="h-11 font-thin border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                                        placeholder="Ej: 1 hora" />
                                    {errors.duracion && <p className="text-xs text-red-500">{errors.duracion.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="precio" className="text-sm font-medium dark:text-gray-200">Precio</Label>
                                    <Controller
                                        control={control}
                                        name="precio"
                                        rules={{ required: "El precio es requerido" }}
                                        render={({ field }) => (
                                            <Input
                                                id="precio"
                                                type="text"
                                                value={displayedPrecio}
                                                onChange={(e) => {
                                                    const onlyDigits = normalizePriceInput(e.target.value)
                                                    field.onChange(onlyDigits)
                                                }}
                                                className="h-11 font-thin border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                                                placeholder="300"
                                            />
                                        )}
                                    />
                                {errors.precio && <p className="text-xs text-red-500">{errors.precio.message}</p>}
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="notas" className="text-sm font-medium dark:text-gray-200">Notas (Opcional)</Label>
                                <Textarea 
                                    {...register("notas")} 
                                    id="notas" 
                                    rows={3} 
                                    className="resize-none font-thin border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <DialogFooter className="px-8 py-6 bg-muted/30 dark:bg-gray-900/50 border-t border-border/70 dark:border-gray-700">
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting} className="flex-1 sm:flex-none h-11 border-border/70 hover:bg-accent dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 transition-all duration-200">Cancelar</Button>
                                <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200">
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                            Guardando...
                                        </span>
                                    ) : (
                                        "Crear Servicio"
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