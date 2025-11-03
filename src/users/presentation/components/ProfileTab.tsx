import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { Mail, MapPin, Phone, User } from "lucide-react"
import type { UseFormRegister } from "react-hook-form"
import type { User as UserType } from "@/auth/domain/entities/user.entity"

interface ProfileTabProps {
    isEditing: boolean
    register: UseFormRegister<{
        name: string
        email: string
        phone?: string
        imageUrl?: string | File
        location?: string
        bio?: string
    }>
    user: UserType
}

export const ProfileTab = ({ isEditing, register, user }: ProfileTabProps) => {
    return (
        <Card className="shadow-md border-border/50 overflow-hidden backdrop-blur-sm bg-background/50">
            <CardHeader className="space-y-2 bg-linear-to-br from-muted/50 to-muted/30 border-b pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                    <div className="h-8 w-1 bg-primary rounded-full" />
                    Información Personal
                </CardTitle>
                <CardDescription className="text-base">
                    Actualiza tu información de perfil y cómo otros te ven
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-8 pb-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                        <Label htmlFor="name" className="flex items-center gap-2.5 text-sm font-semibold">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <User className="h-4 w-4 text-primary" />
                            </div>
                            Nombre completo
                        </Label>
                        <Input
                            id="name"
                            {...register("name")}
                            disabled={!isEditing}
                            className="disabled:opacity-100 disabled:cursor-default h-12 transition-all focus:ring-2 focus:ring-primary/30 border-border/50"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="email" className="flex items-center gap-2.5 text-sm font-semibold">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <Mail className="h-4 w-4 text-primary" />
                            </div>
                            Correo electrónico
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            disabled={!isEditing}
                            className="disabled:opacity-100 disabled:cursor-default h-12 transition-all focus:ring-2 focus:ring-primary/30 border-border/50"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="phone" className="flex items-center gap-2.5 text-sm font-semibold">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <Phone className="h-4 w-4 text-primary" />
                            </div>
                            Teléfono
                        </Label>
                        <Input
                            id="phone"
                            type="tel"
                            {...register("phone")}
                            placeholder={!isEditing && !user?.phone ? "Sin teléfono" : "Agrega un teléfono"}
                            disabled={!isEditing}
                            className="disabled:opacity-100 disabled:cursor-default h-12 transition-all focus:ring-2 focus:ring-primary/30 border-border/50"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="location" className="flex items-center gap-2.5 text-sm font-semibold">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <MapPin className="h-4 w-4 text-primary" />
                            </div>
                            Ubicación
                        </Label>
                        <Input
                            id="location"
                            {...register("location")}
                            placeholder={!isEditing && !user?.location ? "Sin ubicación" : "Agrega una ubicación"}
                            disabled={!isEditing}
                            className="disabled:opacity-100 disabled:cursor-default h-12 transition-all focus:ring-2 focus:ring-primary/30 border-border/50"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label htmlFor="bio" className="text-sm font-semibold">
                        Biografía
                    </Label>
                    <Textarea
                        id="bio"
                        {...register("bio")}
                        disabled={!isEditing}
                        className="min-h-[140px] disabled:opacity-100 disabled:cursor-default resize-none transition-all focus:ring-2 focus:ring-primary/30 border-border/50"
                        placeholder={!isEditing && !user?.bio ? "Sin biografía" : "Cuéntanos sobre ti..."}
                    />
                    <p className="text-sm text-muted-foreground">
                        Breve descripción para tu perfil. Máximo 160 caracteres.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
