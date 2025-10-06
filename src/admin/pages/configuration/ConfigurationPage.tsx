"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Clock, DollarSign, Bell, LinkIcon, Palette } from "lucide-react"

export const ConfigurationPage = () => {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
                <p className="text-muted-foreground mt-1">Personaliza tu negocio y preferencias</p>
            </div>

            <Tabs defaultValue="negocio" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="negocio">Negocio</TabsTrigger>
                    <TabsTrigger value="servicios">Servicios</TabsTrigger>
                    <TabsTrigger value="horarios">Horarios</TabsTrigger>
                    <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
                    <TabsTrigger value="integraciones">Integraciones</TabsTrigger>
                </TabsList>

                {/* Business Settings */}
                <TabsContent value="negocio" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                <CardTitle>Información del Negocio</CardTitle>
                            </div>
                            <CardDescription>Actualiza los datos de tu negocio</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="business-name">Nombre del Negocio</Label>
                                <Input id="business-name" defaultValue="Mi Peluquería" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea
                                    id="description"
                                    rows={3}
                                    defaultValue="Peluquería profesional con más de 10 años de experiencia"
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Input id="phone" type="tel" defaultValue="+52 123 456 7890" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="contacto@mipeluqueria.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Dirección</Label>
                                <Input id="address" defaultValue="Av. Principal 123, Ciudad de México" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">URL de Reservas</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">citaspro.com/reservar/</span>
                                    <Input id="slug" defaultValue="mi-peluqueria" className="flex-1" />
                                </div>
                            </div>
                            <Button>Guardar Cambios</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Palette className="h-5 w-5 text-primary" />
                                <CardTitle>Personalización</CardTitle>
                            </div>
                            <CardDescription>Personaliza la apariencia de tu página de reservas</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Color Principal</Label>
                                <div className="flex items-center gap-3">
                                    <Input type="color" defaultValue="#3b82f6" className="w-20 h-10" />
                                    <span className="text-sm text-muted-foreground">#3b82f6</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="logo">Logo del Negocio</Label>
                                <Input id="logo" type="file" accept="image/*" />
                            </div>
                            <Button>Guardar Cambios</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Services Settings */}
                <TabsContent value="servicios" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5 text-primary" />
                                        <CardTitle>Servicios</CardTitle>
                                    </div>
                                    <CardDescription>Gestiona los servicios que ofreces</CardDescription>
                                </div>
                                <Button>Agregar Servicio</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { name: "Corte de Cabello", duration: "1 hora", price: "$300" },
                                    { name: "Tinte", duration: "1.5 horas", price: "$800" },
                                    { name: "Peinado", duration: "1 hora", price: "$400" },
                                    { name: "Corte + Barba", duration: "1.5 horas", price: "$450" },
                                ].map((service, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                        <div>
                                            <p className="font-medium text-foreground">{service.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {service.duration} • {service.price}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                Editar
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Eliminar
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Schedule Settings */}
                <TabsContent value="horarios" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary" />
                                <CardTitle>Horario de Atención</CardTitle>
                            </div>
                            <CardDescription>Configura tus días y horarios de trabajo</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { day: "Lunes", enabled: true, start: "09:00", end: "18:00" },
                                { day: "Martes", enabled: true, start: "09:00", end: "18:00" },
                                { day: "Miércoles", enabled: true, start: "09:00", end: "18:00" },
                                { day: "Jueves", enabled: true, start: "09:00", end: "18:00" },
                                { day: "Viernes", enabled: true, start: "09:00", end: "20:00" },
                                { day: "Sábado", enabled: true, start: "10:00", end: "16:00" },
                                { day: "Domingo", enabled: false, start: "09:00", end: "18:00" },
                            ].map((schedule, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                                    <Switch defaultChecked={schedule.enabled} />
                                    <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                                        <span className="font-medium text-foreground">{schedule.day}</span>
                                        <Input type="time" defaultValue={schedule.start} disabled={!schedule.enabled} />
                                        <Input type="time" defaultValue={schedule.end} disabled={!schedule.enabled} />
                                    </div>
                                </div>
                            ))}
                            <Button>Guardar Horarios</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Duración de Slots</CardTitle>
                            <CardDescription>Configura la duración mínima de cada cita</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="slot-duration">Duración del Slot (minutos)</Label>
                                <Input id="slot-duration" type="number" defaultValue="30" min="15" step="15" />
                            </div>
                            <Button>Guardar Cambios</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notificaciones" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-primary" />
                                <CardTitle>Notificaciones</CardTitle>
                            </div>
                            <CardDescription>Configura cómo y cuándo recibir notificaciones</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Nueva Cita</p>
                                        <p className="text-sm text-muted-foreground">Recibe notificación cuando se agenda una nueva cita</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Cancelación de Cita</p>
                                        <p className="text-sm text-muted-foreground">Notificación cuando un cliente cancela</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Recordatorio de Cita</p>
                                        <p className="text-sm text-muted-foreground">Recordatorio 1 hora antes de cada cita</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Resumen Diario</p>
                                        <p className="text-sm text-muted-foreground">Recibe un resumen de citas cada mañana</p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                            <Button>Guardar Preferencias</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Integrations Settings */}
                <TabsContent value="integraciones" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <LinkIcon className="h-5 w-5 text-primary" />
                                <CardTitle>Integraciones</CardTitle>
                            </div>
                            <CardDescription>Conecta con otras herramientas y servicios</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                {
                                    name: "Google Calendar",
                                    description: "Sincroniza tus citas con Google Calendar",
                                    connected: true,
                                },
                                {
                                    name: "WhatsApp Business",
                                    description: "Envía confirmaciones y recordatorios por WhatsApp",
                                    connected: false,
                                },
                                {
                                    name: "Stripe",
                                    description: "Acepta pagos en línea",
                                    connected: false,
                                },
                                {
                                    name: "Mailchimp",
                                    description: "Gestiona tu lista de correos",
                                    connected: false,
                                },
                            ].map((integration, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                    <div>
                                        <p className="font-medium text-foreground">{integration.name}</p>
                                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                                    </div>
                                    <Button variant={integration.connected ? "outline" : "default"}>
                                        {integration.connected ? "Desconectar" : "Conectar"}
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
