import React from "react";
import { Clock, CheckCircle } from "lucide-react";

interface Upcoming {
    time: string;
    client: string;
    service: string;
    status: "Confirmada" | "Pendiente" | "Cancelada";
    color: string;
}

interface Props {
    data: Upcoming[];
}

export const UpcomingAppointmentsList: React.FC<Props> = ({ data }) => {
    return (
        <div className="space-y-3">
            {data.map((appointment, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                >
                    <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-${appointment.color}-100 dark:bg-${appointment.color}-900/30`}>
                        <Clock className={`h-6 w-6 text-${appointment.color}-600 dark:text-${appointment.color}-400`} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground dark:text-gray-100">{appointment.client}</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">{appointment.time} • {appointment.service}</p>
                    </div>
                    {appointment.status === "Confirmada" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                        <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
                    )}
                </div>
            ))}
        </div>
    );
};
