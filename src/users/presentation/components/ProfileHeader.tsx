import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import { Camera, Check, Mail, User, X } from "lucide-react"
import { getInitials } from "@/shared/lib/name.utils"
import type { User as UserType } from "@/auth/domain/entities/user.entity"

interface ProfileHeaderProps {
    user: UserType
    isEditing: boolean
    isSubmitting: boolean
    imagePreview: string | null
    onEditClick: () => void
    onSaveClick: () => void
    onCancelClick: () => void
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function capitalizeWords(text: string): string {
    return text
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
}

export const ProfileHeader = ({
    user,
    isEditing,
    isSubmitting,
    imagePreview,
    onEditClick,
    onSaveClick,
    onCancelClick,
    onFileChange,
}: ProfileHeaderProps) => {
    return (
        <div className="relative mb-12">
            <div className="relative h-56 w-full overflow-hidden rounded-3xl border border-border/40 bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 shadow-lg">
                {/* Animated mesh background */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 40% 20%, hsl(var(--primary) / 0.1) 0%, transparent 50%)
                        `,
                    }}
                />
                {/* Dot pattern overlay */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground) / 0.15) 1px, transparent 0)`,
                        backgroundSize: "32px 32px",
                    }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
            </div>

            <div className="relative -mt-24 px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 lg:gap-8">
                    <div className="relative group">
                        {/* Glow effect */}
                        <div className="absolute -inset-2 bg-linear-to-r from-primary/40 via-primary/30 to-primary/20 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-700 animate-pulse" />
                        {/* Avatar */}
                        <Avatar className="relative h-40 w-40 border-[6px] border-background shadow-2xl ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground text-6xl font-bold">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            )}
                        </Avatar>
                        {/* Camera button */}
                        {isEditing && (
                            <>
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={onFileChange}
                                />
                                <label
                                    htmlFor="avatar-upload"
                                    className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 transition-all hover:scale-110 ring-4 ring-background cursor-pointer"
                                >
                                    <Camera className="h-5 w-5" />
                                </label>
                            </>
                        )}
                    </div>

                    <div className="flex-1 pb-3 space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h1 className="text-5xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text">
                                        {capitalizeWords(user.name)}
                                    </h1>
                                </div>
                                <div className="flex items-center gap-3 text-lg text-muted-foreground">
                                    <Mail className="h-5 w-5 shrink-0" />
                                    <span className="no-underline">{user.email}</span>
                                </div>
                                <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                                    {user.bio || "Sin biografía"}
                                </p>
                            </div>

                            {!isEditing ? (
                                <Button
                                    onClick={onEditClick}
                                    size="lg"
                                    className="shadow-lg hover:shadow-xl transition-all hover:scale-105 h-12 px-6"
                                >
                                    <User className="mr-2 h-5 w-5" />
                                    Editar perfil
                                </Button>
                            ) : (
                                <div className="flex gap-3">
                                    <Button
                                        onClick={onSaveClick}
                                        size="lg"
                                        className="shadow-lg hover:shadow-xl transition-all h-12 px-6"
                                        disabled={isSubmitting}
                                    >
                                        <Check className="mr-2 h-5 w-5" />
                                        {isSubmitting ? "Guardando..." : "Guardar"}
                                    </Button>
                                    <Button
                                        onClick={onCancelClick}
                                        variant="outline"
                                        size="lg"
                                        className="hover:bg-muted/50 h-12 px-6 bg-transparent"
                                        disabled={isSubmitting}
                                    >
                                        <X className="mr-2 h-5 w-5" />
                                        Cancelar
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
