import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router"
import smartCitasTwo from "../../assets/images/smartCitas.png";

export const LoginPage = () => {
    return (
        <>
            <div className="absolute top-6 left-6">
                <img src={smartCitasTwo} className="h-15 md:h-20 lg:h-25 w-auto" alt="SmartCitas" />
            </div>

            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
                        <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input id="email" type="email" placeholder="tu@email.com" required />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Link to="/recuperar-password" className="text-sm text-primary hover:underline">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Iniciar Sesión
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
                            ¿No tienes una cuenta?{" "}
                            <Link to="/auth/register" className="text-primary hover:underline font-medium">
                                Regístrate gratis
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    Al continuar, aceptas nuestros{" "}
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
