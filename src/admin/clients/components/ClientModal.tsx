import { Button } from "@/components/ui/button"
import { User, Phone, Mail, MapPin } from "lucide-react"
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
import type { ClientFormData } from "@/admin/clients/interfaces/client.interface"

interface ClientModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    register: UseFormRegister<ClientFormData>
    errors: FieldErrors<ClientFormData>
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
            <DialogContent className="sm:max-w-[600px] font-poppins">
                <DialogHeader>
                    <DialogTitle>Nuevo Cliente</DialogTitle>
                    <DialogDescription>
                        Completa los datos para registrar un nuevo cliente
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Nombre */}
                        <div className="space-y-2">
                            <Label htmlFor="nombre">
                                <User className="h-4 w-4 inline mr-2" />
                                Nombre Completo
                            </Label>
                            <Input
                                id="nombre"
                                placeholder="Ej: María González"
                                {...register("nombre", {
                                    required: "El nombre es requerido",
                                    minLength: {
                                        value: 3,
                                        message: "El nombre debe tener al menos 3 caracteres"
                                    }
                                })}
                            />
                            {errors.nombre && (
                                <p className="text-sm text-red-500">{errors.nombre.message}</p>
                            )}
                        </div>

                        {/* Email y Teléfono */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    <Mail className="h-4 w-4 inline mr-2" />
                                    Correo Electrónico
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="maria@ejemplo.com"
                                    {...register("email", {
                                        required: "El correo es requerido",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Correo electrónico inválido"
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="telefono">
                                    <Phone className="h-4 w-4 inline mr-2" />
                                    Teléfono
                                </Label>
                                <Input
                                    id="telefono"
                                    type="tel"
                                    placeholder="+52 123 456 7890"
                                    {...register("telefono", {
                                        required: "El teléfono es requerido",
                                        pattern: {
                                            value: /^[+]?[\d\s-()]+$/,
                                            message: "Formato de teléfono inválido"
                                        }
                                    })}
                                />
                                {errors.telefono && (
                                    <p className="text-sm text-red-500">{errors.telefono.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Dirección */}
                        <div className="space-y-2">
                            <Label htmlFor="direccion">
                                <MapPin className="h-4 w-4 inline mr-2" />
                                Dirección (Opcional)
                            </Label>
                            <Input
                                id="direccion"
                                placeholder="Calle, número, colonia, ciudad"
                                {...register("direccion")}
                            />
                        </div>

                        {/* Notas */}
                        <div className="space-y-2">
                            <Label htmlFor="notas">Notas (Opcional)</Label>
                            <Textarea
                                id="notas"
                                placeholder="Información adicional sobre el cliente..."
                                rows={3}
                                {...register("notas")}
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
                            {isSubmitting ? "Guardando..." : "Guardar Cliente"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
