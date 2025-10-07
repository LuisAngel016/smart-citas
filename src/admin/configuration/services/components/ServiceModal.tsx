"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { ServiceInput } from "../interfaces/service.interface"

interface ServiceModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    register: UseFormRegister<ServiceInput>
    errors: FieldErrors<ServiceInput>
    onSubmit: () => void
    isSubmitting?: boolean
}

export const ServiceModal = ({
    open,
    onOpenChange,
    register,
    errors,
    onSubmit,
    isSubmitting = false,
}: ServiceModalProps) => {
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
                                    <Label htmlFor="name" className="text-sm font-medium dark:text-gray-200">Nombre del Servicio</Label>
                                    <Input
                                        {...register("name", { required: "El nombre es requerido" })}
                                        id="name"
                                        className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                        placeholder="Corte de cabello" />
                                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="duration" className="text-sm font-medium dark:text-gray-200">Duración</Label>
                                    <Input
                                        {...register("duration", { required: "La duración es requerida" })}
                                        id="duration"
                                        className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                        placeholder="Ej: 1 hora" />
                                    {errors.duration && <p className="text-xs text-red-500">{errors.duration.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="price" className="text-sm font-medium dark:text-gray-200">Precio</Label>
                                <Input
                                    {...register("price", {
                                        required: "El precio es requerido",
                                        valueAsNumber: true
                                    })}
                                    id="price"
                                    type="text"
                                    className="h-11 border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                    placeholder="300"
                                />
                                {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="notes" className="text-sm font-medium dark:text-gray-200">Notas (Opcional)</Label>
                                <Textarea id="notes" rows={3} className="resize-none border-border/70 focus:border-primary transition-all duration-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...register("notes")} />
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