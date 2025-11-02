import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartContainer } from "@/shared/components/ui/chart";

interface Props {
    data: { mes: string; ingresos: number; gastos: number }[];
}

interface TooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        payload: { mes: string };
        color: string;
    }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 font-poppins">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{payload[0].payload.mes}</p>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].color }} />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Ingresos:</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 ml-auto">
                            ${payload[0].value.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export const RevenueChart: React.FC<Props> = ({ data }) => {
    return (
        <ChartContainer
            config={{
                ingresos: { label: "Ingresos", color: "hsl(199, 89%, 65%)" },
                // gastos: { label: "Gastos", color: "hsl(158, 64%, 52%)" },
            }}
            className="h-80"
        >
            <BarChart
                data={data}
                width={500}
                height={320}
                margin={{ top: 16, right: 24, left: 40, bottom: 12 }}
                barCategoryGap="20%"
            >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis
                    dataKey="mes"
                    tick={{ fontFamily: 'Poppins, sans-serif', fontSize: 12 }}
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                />
                <YAxis
                    tick={{ fontFamily: 'Poppins, sans-serif', fontSize: 12 }}
                    stroke="hsl(var(--muted-foreground))"
                    axisLine={false}
                    tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
                <Bar dataKey="ingresos" fill="hsl(199, 89%, 65%)" radius={[8, 8, 0, 0]} maxBarSize={60} />
                {/* <Bar dataKey="gastos" fill="hsl(158, 64%, 52%)" radius={[8, 8, 0, 0]} maxBarSize={60} /> */}
            </BarChart>
        </ChartContainer>
    );
};
