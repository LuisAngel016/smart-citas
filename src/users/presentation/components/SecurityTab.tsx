import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { AlertTriangle, Key, Lock, Shield } from "lucide-react"

export const SecurityTab = () => {
    return (
        <>
            <Card className="shadow-md border-border/50 overflow-hidden backdrop-blur-sm bg-background/50">
                <CardHeader className="bg-linear-to-br from-muted/50 to-muted/30 border-b pb-6">
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        Seguridad de la cuenta
                    </CardTitle>
                    <CardDescription className="text-base">
                        Gestiona la seguridad y privacidad de tu cuenta
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6 pb-6">
                    <div className="flex items-center justify-between rounded-2xl border border-border/50 p-5 hover:bg-muted/30 transition-all hover:shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 to-primary/10 ring-1 ring-primary/20">
                                <Lock className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <div className="font-semibold text-base">Cambiar contraseña</div>
                                <div className="text-sm text-muted-foreground">Actualiza tu contraseña regularmente</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover:bg-muted/50 h-10 px-4 bg-transparent">
                            Cambiar
                        </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-border/50 p-5 hover:bg-muted/30 transition-all hover:shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 to-primary/10 ring-1 ring-primary/20">
                                <Key className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <div className="font-semibold text-base">Autenticación de dos factores</div>
                                <div className="text-sm text-muted-foreground">Añade una capa extra de seguridad</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover:bg-muted/50 h-10 px-4 bg-transparent">
                            Activar
                        </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-border/50 p-5 hover:bg-muted/30 transition-all hover:shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 to-primary/10 ring-1 ring-primary/20">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <div className="font-semibold text-base">Sesiones activas</div>
                                <div className="text-sm text-muted-foreground">Gestiona tus dispositivos conectados</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover:bg-muted/50 h-10 px-4 bg-transparent">
                            Ver
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-destructive/50 shadow-lg overflow-hidden backdrop-blur-sm bg-destructive/5">
                <CardHeader className="bg-linear-to-br from-destructive/10 to-destructive/5 border-b border-destructive/30 pb-6">
                    <CardTitle className="flex items-center gap-3 text-destructive text-2xl">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/20 ring-2 ring-destructive/30">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        Zona de peligro
                    </CardTitle>
                    <CardDescription className="text-base">
                        Acciones irreversibles relacionadas con tu cuenta
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 pb-6">
                    <div className="flex items-center justify-between rounded-2xl border-2 border-destructive/50 bg-destructive/10 p-5 hover:bg-destructive/15 transition-all">
                        <div>
                            <h4 className="font-semibold text-base">Eliminar cuenta</h4>
                            <p className="text-sm text-muted-foreground mt-1.5">
                                Una vez eliminada, no podrás recuperar tu cuenta ni tus datos
                            </p>
                        </div>
                        <Button variant="destructive" size="sm" className="hover:bg-destructive/90 h-10 px-5 shadow-md">
                            Eliminar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
