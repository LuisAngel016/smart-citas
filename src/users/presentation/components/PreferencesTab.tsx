import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Switch } from "@/shared/components/ui/switch"
import { Bell, Mail, Palette } from "lucide-react"

interface PreferencesTabProps {
    notifications: {
        email: boolean
        push: boolean
        marketing: boolean
    }
    setNotifications: React.Dispatch<React.SetStateAction<{
        email: boolean
        push: boolean
        marketing: boolean
    }>>
}

export const PreferencesTab = ({ notifications, setNotifications }: PreferencesTabProps) => {
    return (
        <>
            <Card className="shadow-md border-border/50 overflow-hidden backdrop-blur-sm bg-background/50">
                <CardHeader className="bg-linear-to-br from-muted/50 to-muted/30 border-b pb-6">
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        Preferencias de notificación
                    </CardTitle>
                    <CardDescription className="text-base">Gestiona cómo y cuándo recibes notificaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6 pb-6">
                    <div className="flex items-center justify-between rounded-2xl border border-border/50 p-5 hover:bg-muted/30 transition-all hover:shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 to-primary/10 ring-1 ring-primary/20">
                                <Bell className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <div className="font-semibold text-base">Notificaciones por email</div>
                                <div className="text-sm text-muted-foreground">Recibe actualizaciones por correo</div>
                            </div>
                        </div>
                        <Switch
                            checked={notifications.email}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-border/50 p-5 hover:bg-muted/30 transition-all hover:shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 to-primary/10 ring-1 ring-primary/20">
                                <Bell className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <div className="font-semibold text-base">Notificaciones push</div>
                                <div className="text-sm text-muted-foreground">Alertas en tiempo real</div>
                            </div>
                        </div>
                        <Switch
                            checked={notifications.push}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-border/50 p-5 hover:bg-muted/30 transition-all hover:shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 to-primary/10 ring-1 ring-primary/20">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <div className="font-semibold text-base">Emails de marketing</div>
                                <div className="text-sm text-muted-foreground">Novedades y ofertas especiales</div>
                            </div>
                        </div>
                        <Switch
                            checked={notifications.marketing}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-md border-border/50 overflow-hidden backdrop-blur-sm bg-background/50">
                <CardHeader className="bg-linear-to-br from-muted/50 to-muted/30 border-b pb-6">
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        Apariencia
                    </CardTitle>
                    <CardDescription className="text-base">Personaliza la apariencia de tu interfaz</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 pb-6">
                    <div className="flex items-center justify-between rounded-2xl border border-border/50 p-5 hover:bg-muted/30 transition-all hover:shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 to-primary/10 ring-1 ring-primary/20">
                                <Palette className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <div className="font-semibold text-base">Tema</div>
                                <div className="text-sm text-muted-foreground">Claro, oscuro o automático</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover:bg-muted/50 h-10 px-4 bg-transparent">
                            Cambiar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
