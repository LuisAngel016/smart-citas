import { Mail, Phone } from "lucide-react"
import type { Client } from "@/admin/clients/interfaces/client.interface"

interface ClientCardProps {
    client: Client
    onClick?: () => void
}

export const ClientCard = ({ client, onClick }: ClientCardProps) => {
    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
        >
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                        {client.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </span>
                </div>
                <div>
                    <p className="font-medium text-foreground">{client.nombre}</p>
                    <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {client.email}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {client.telefono}
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium text-foreground">{client.citas} citas</p>
                {client.ultimaCita && (
                    <p className="text-xs text-muted-foreground">Última: {client.ultimaCita}</p>
                )}
            </div>
        </div>
    )
}
