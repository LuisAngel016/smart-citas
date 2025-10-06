import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Mail, Phone } from "lucide-react"

const clientes = [
    {
        id: 1,
        nombre: "María González",
        email: "maria@email.com",
        telefono: "+52 123 456 7890",
        citas: 12,
        ultimaCita: "15 Ene 2025",
    },
    {
        id: 2,
        nombre: "Carlos Ruiz",
        email: "carlos@email.com",
        telefono: "+52 123 456 7891",
        citas: 8,
        ultimaCita: "18 Ene 2025",
    },
    {
        id: 3,
        nombre: "Ana Martínez",
        email: "ana@email.com",
        telefono: "+52 123 456 7892",
        citas: 15,
        ultimaCita: "20 Ene 2025",
    },
    {
        id: 4,
        nombre: "Luis Hernández",
        email: "luis@email.com",
        telefono: "+52 123 456 7893",
        citas: 5,
        ultimaCita: "22 Ene 2025",
    },
]

export const ClientsPage = () => {

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
                    <p className="text-muted-foreground mt-1">Gestiona tu base de clientes</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Cliente
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Buscar clientes..." className="pl-9" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {clientes.map((cliente) => (
                            <div
                                key={cliente.id}
                                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-sm font-semibold text-primary">
                                            {cliente.nombre
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">{cliente.nombre}</p>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Mail className="h-3 w-3" />
                                                {cliente.email}
                                            </span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Phone className="h-3 w-3" />
                                                {cliente.telefono}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-foreground">{cliente.citas} citas</p>
                                    <p className="text-xs text-muted-foreground">Última: {cliente.ultimaCita}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
