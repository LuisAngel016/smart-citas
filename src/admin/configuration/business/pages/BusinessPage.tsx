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
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary dark:text-blue-400" />
                        <CardTitle className="dark:text-gray-100">Información del Negocio</CardTitle>
                    </div>
                    <CardDescription className="dark:text-gray-400">Actualiza los datos de tu negocio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="business-name" className="dark:text-gray-200">Nombre del Negocio</Label>
                        <Input id="business-name" defaultValue="Mi Peluquería" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="dark:text-gray-200">Descripción</Label>
                        <Textarea
                            id="description"
                            rows={3}
                            defaultValue="Peluquería profesional con más de 10 años de experiencia"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="dark:text-gray-200">Teléfono</Label>
                            <Input id="phone" type="tel" defaultValue="+52 123 456 7890" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                            <Input id="email" type="email" defaultValue="contacto@mipeluqueria.com" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address" className="dark:text-gray-200">Dirección</Label>
                        <Input id="address" defaultValue="Av. Principal 123, Ciudad de México" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug" className="dark:text-gray-200">URL de Reservas</Label>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground dark:text-gray-400">citaspro.com/reservar/</span>
                            <Input id="slug" defaultValue="mi-peluqueria" className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                        </div>
                    </div>
                    <Button>Guardar Cambios</Button>
                </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Palette className="h-5 w-5 text-primary dark:text-blue-400" />
                        <CardTitle className="dark:text-gray-100">Personalización</CardTitle>
                    </div>
                    <CardDescription className="dark:text-gray-400">Personaliza la apariencia de tu página de reservas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label className="dark:text-gray-200">Color Principal</Label>
                        <div className="flex items-center gap-3">
                            <Input type="color" defaultValue="#3b82f6" className="w-20 h-10 dark:bg-gray-700 dark:border-gray-600" />
                            <span className="text-sm text-muted-foreground dark:text-gray-400">#3b82f6</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="logo" className="dark:text-gray-200">Logo del Negocio</Label>
                        <Input id="logo" type="file" accept="image/*" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                    </div>
                    <Button>Guardar Cambios</Button>
                </CardContent>
            </Card>
        </div>
    )
}