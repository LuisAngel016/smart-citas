"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useSearchParams } from "react-router"
import smartCitasTwo from "../../assets/images/smartCitas.png";


export const RegisterPage = () => {
    const [searchParams] = useSearchParams()
    const plan = searchParams.get("plan")

    return (
        <>
            <div className="absolute top-6 left-6">
                <img src={smartCitasTwo} className="h-15 md:h-20 lg:h-25 w-auto" alt="SmartCitas" />
            </div>
            <div className="w-full max-w-md">

                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
                        <CardDescription>
                            {plan === "premium"
                                ? "Comienza tu prueba gratuita de 14 días del Plan Premium"
                                : "Comienza gratis, sin tarjeta de crédito"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="business-name">Nombre del Negocio</Label>
                                <Input id="business-name" placeholder="Mi Peluquería" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Tu Nombre Completo</Label>
                                <Input id="name" placeholder="Juan Pérez" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input id="email" type="email" placeholder="tu@email.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input id="password" type="password" placeholder="Mínimo 8 caracteres" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Teléfono (opcional)</Label>
                                <Input id="phone" type="tel" placeholder="+52 123 456 7890" />
                            </div>
                            <Button type="submit" className="w-full">
                                {plan === "premium" ? "Comenzar Prueba Gratis" : "Crear Cuenta Gratis"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">O</span>
                            </div>
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/auth/login" className="text-primary hover:underline font-medium">
                                Inicia sesión
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    Al registrarte, aceptas nuestros{" "}
                    <a href="#" className="underline hover:text-foreground">
                        Términos de Servicio
                    </a>{" "}
                    y{" "}
                    <a href="#" className="underline hover:text-foreground">
                        Política de Privacidad
                    </a>
                </p>
            </div>
        </>
    )
}
