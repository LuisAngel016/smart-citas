import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Service {
    servicio: string;
    cantidad: number;
    cambio: number;
}

interface Props {
    data: Service[];
}

export const ServicesList: React.FC<Props> = ({ data }) => {
    const maxValue = Math.max(...data.map((d) => d.cantidad), 1);

    return (
        <div className="space-y-4">
            {data.map((service, index) => {
                const percentage = (service.cantidad / maxValue) * 100;
                const isPositive = service.cambio > 0;

                return (
                    <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium dark:text-gray-200">{service.servicio}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold dark:text-gray-100">{service.cantidad}</span>
                                <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    <span>{Math.abs(service.cambio)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="absolute h-full bg-linear-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
