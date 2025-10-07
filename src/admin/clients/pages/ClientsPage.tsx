import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { ClientModal } from "@/admin/clients/components/ClientModal"
import { ClientCard } from "@/admin/clients/components/ClientCard"
import { useClientForm } from "@/admin/clients/hooks/useClientForm"
import type { Client } from "../interfaces/client.interface"
import { useSearchParams } from "react-router"

const clientes: Client[] = [
    {
        id: "1",
        nombre: "María González",
        email: "maria@email.com",
        telefono: "+52 123 456 7890",
        citas: 12,
        ultimaCita: "15 Ene 2025",
        createdAt: "2024-01-01",
    },
    {
        id: "2",
        nombre: "Carlos Ruiz",
        email: "carlos@email.com",
        telefono: "+52 123 456 7891",
        citas: 8,
        ultimaCita: "18 Ene 2025",
        createdAt: "2024-01-02",
    },
    {
        id: "3",
        nombre: "Ana Martínez",
        email: "ana@email.com",
        telefono: "+52 123 456 7892",
        citas: 15,
        ultimaCita: "20 Ene 2025",
        createdAt: "2024-01-03",
    },
    {
        id: "4",
        nombre: "Luis Hernández",
        email: "luis@email.com",
        telefono: "+52 123 456 7893",
        citas: 5,
        ultimaCita: "22 Ene 2025",
        createdAt: "2024-01-04",
    },
]

export const ClientsPage = () => {

    const [searchParams,] = useSearchParams();

    const query = searchParams.get("query")
    console.log(searchParams.get("query"));

    const {
        isDialogOpen,
        openDialog,
        setIsDialogOpen,
        register,
        handleSubmit,
        errors,
        isSubmitting,
    } = useClientForm()

    return (
        <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground dark:text-gray-100">Clientes</h1>
                    <p className="text-muted-foreground dark:text-gray-400 mt-1">Gestiona tu base de clientes</p>
                </div>
                <Button onClick={openDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Cliente
                </Button>
            </div>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                            <Input placeholder="Buscar clientes..." className="pl-9 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {
                            // TODO: Replace with real data and implement search
                            query
                                ? clientes
                                    .filter((client) => client.nombre.toLowerCase().includes(query))
                                    .map((cliente) => (
                                        <ClientCard key={cliente.id} client={cliente} />
                                    ))
                                : clientes.map((cliente) => (
                                    <ClientCard key={cliente.id} client={cliente} />
                                ))
                        }
                    </div>
                </CardContent>
            </Card>

            <ClientModal
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                register={register}
                errors={errors}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}
