"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { CheckCircle, Sparkles } from "lucide-react"

interface CompleteAppointmentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    appointmentName: string | null;
    onConfirm: () => void;
    isCompleting?: boolean;
}

export const CompleteAppointmentModal = ({
    open,
    onOpenChange,
    appointmentName,
    onConfirm,
    isCompleting = false,
}: CompleteAppointmentModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px] font-poppins border-0 p-0 overflow-visible bg-white dark:bg-gray-800">
                <div className="relative">
                    {/* Header con gradiente sutil */}
                    <DialogHeader className="px-8 pt-8 pb-6 space-y-4 bg-linear-to-b from-green-500/5 via-green-500/3 to-transparent dark:from-green-500/10 dark:via-green-500/5">
                        <div className="flex items-start gap-4">
                            {/* Icono con animación */}
                            <div className="relative shrink-0">
                                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
                                <div className="relative p-3 rounded-2xl bg-linear-to-br from-green-500/15 to-green-500/5 border-2 border-green-500/20 shadow-lg">
                                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-500" />
                                </div>
                            </div>

                            <div className="flex-1 pt-1">
                                <DialogTitle className="text-2xl font-bold text-foreground dark:text-gray-100 mb-2 flex items-center gap-2">
                                    ¿Completar cita?
                                    <Sparkles className="h-5 w-5 text-green-600 dark:text-green-500" />
                                </DialogTitle>
                                <DialogDescription className="text-base text-muted-foreground dark:text-gray-400 leading-relaxed">
                                    {appointmentName && (
                                        <>
                                            Estás a punto de marcar como completada la cita{" "}
                                            <span className="font-semibold text-foreground dark:text-gray-100 inline-block px-2 py-0.5 bg-muted/50 dark:bg-gray-700 rounded">
                                                "{appointmentName}"
                                            </span>
                                            . Esto indicará que el servicio fue realizado exitosamente.
                                        </>
                                    )}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Footer con botones mejorados */}
                    <DialogFooter className="px-8 py-6 bg-muted/40 dark:bg-gray-900/60 border-t border-border/70 dark:border-gray-700">
                        <div className="flex gap-3 w-full sm:w-auto sm:flex-row-reverse">
                            <Button
                                type="button"
                                onClick={onConfirm}
                                disabled={isCompleting}
                                className="flex-1 sm:flex-none h-11 bg-linear-to-r from-green-600 to-green-600/90 hover:from-green-600/90 hover:to-green-600/80 text-white shadow-lg shadow-green-600/25 hover:shadow-green-600/40 transition-all duration-200 font-medium"
                            >
                                {isCompleting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Completando...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4" />
                                        Marcar como completada
                                    </span>
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isCompleting}
                                className="flex-1 sm:flex-none h-11 font-medium border-2 border-border/70 hover:bg-accent hover:border-border dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}