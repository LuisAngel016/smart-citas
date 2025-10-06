"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Palette, Building2 } from "lucide-react"

export const BusinessPage = () => {
    return (
        <div className="space-y-4">
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
        </div>
    )
}