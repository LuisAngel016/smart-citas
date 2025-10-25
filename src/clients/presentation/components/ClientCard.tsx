import type { Client } from "@/clients/domain/domain/entities/client.entity";
import { Mail, Phone } from "lucide-react"

interface ClientCardProps {
    client: Client
    onClick?: () => void
}

export const ClientCard = ({ client, onClick }: ClientCardProps) => {
    const initials = (client?.name ?? client?.email ?? "")
        .split(" ")
        .map((n) => (n ? n[0] : ""))
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between p-4 rounded-lg border border-border dark:border-gray-700 hover:bg-muted/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
        >
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary dark:text-blue-400">
                        {initials}
                    </span>
                </div>
                <div>
                    <p className="font-medium text-foreground dark:text-gray-100">{client.name ?? client.email ?? "—"}</p>
                    <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground dark:text-gray-400 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {client.email ?? "—"}
                        </span>
                        <span className="text-xs text-muted-foreground dark:text-gray-400 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {client.phone ?? "—"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                {/* <p className="text-sm font-medium text-foreground dark:text-gray-100">{client.citas} citas</p> */}
                {/* {client.ultimaCita && (
                    <p className="text-xs text-muted-foreground dark:text-gray-400">Última: {client.ultimaCita}</p>
                )} */}
            </div>
        </div>
    )
}
