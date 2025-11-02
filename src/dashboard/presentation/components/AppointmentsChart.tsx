import React from "react";
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart";

interface Props {
    data: { day: string; citas: number; promedio: number }[];
}

export const AppointmentsChart: React.FC<Props> = ({ data }) => {
    return (
        <ChartContainer
            config={{
                citas: { label: "Citas", color: "hsl(217, 91%, 60%)" },
                promedio: { label: "Promedio", color: "hsl(142, 71%, 45%)" },
            }}
            className="h-80"
        >
            <AreaChart data={data} width={500} height={320}>
                <defs>
                    <linearGradient id="colorCitas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis dataKey="day" className="text-xs font-medium" stroke="hsl(var(--muted-foreground))" />
                <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                    type="monotone"
                    dataKey="citas"
                    stroke="hsl(217, 91%, 60%)"
                    strokeWidth={3}
                    fill="url(#colorCitas)"
                    dot={{ fill: "hsl(217, 91%, 60%)", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                />
                <Line
                    type="monotone"
                    dataKey="promedio"
                    stroke="hsl(142, 71%, 45%)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                />
            </AreaChart>
        </ChartContainer>
    );
};
