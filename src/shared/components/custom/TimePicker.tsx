"use client"
import { Clock } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/shared/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useState, useRef, useEffect } from "react"

interface TimePickerProps {
    value?: string
    onChange?: (value: string) => void
    className?: string
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
    const [open, setOpen] = useState(false)
    const [hour, minute] = value ? value.split(":") : ["12", "00"]
    const selectedHour = hour?.padStart(2, "0") || "12"
    const selectedMinute = minute?.padStart(2, "0") || "00"

    const hourScrollRef = useRef<HTMLDivElement>(null)
    const minuteScrollRef = useRef<HTMLDivElement>(null)

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

    // Scroll automático al elemento seleccionado cuando se abre
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                const selectedHourEl = hourScrollRef.current?.querySelector(`[data-hour="${selectedHour}"]`)
                const selectedMinuteEl = minuteScrollRef.current?.querySelector(`[data-minute="${selectedMinute}"]`)

                selectedHourEl?.scrollIntoView({ block: "center", behavior: "smooth" })
                selectedMinuteEl?.scrollIntoView({ block: "center", behavior: "smooth" })
            }, 50)
        }
    }, [open, selectedHour, selectedMinute])

    const handleTimeSelect = (newHour: string, newMinute: string, closePopover = false) => {
        const timeValue = `${newHour}:${newMinute}`
        onChange?.(timeValue)
        if (closePopover) {
            setOpen(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent, newHour: string, newMinute: string) => {
        if (e.key === 'Enter') {
            handleTimeSelect(newHour, newMinute, true)
        }
    }

    const displayValue = value || "Seleccionar hora"

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        "w-full h-11 justify-start text-left font-normal border-border/70 hover:bg-accent hover:border-primary/50 transition-all duration-200",
                        !value && "text-muted-foreground",
                        className,
                    )}
                >
                    <Clock className="mr-2 h-4 w-4 opacity-60" />
                    {displayValue}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="font-poppins w-72 p-0" align="start">
                <div className="p-4 border-b bg-muted/30">
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center gap-1">
                            <span className="font-poppins text-2xl font-semibold tabular-nums tracking-tight">{selectedHour}</span>
                            <span className="text-1xl text-muted-foreground font-light">:</span>
                            <span className="font-poppins text-2xl font-semibold tabular-nums tracking-tight">{selectedMinute}</span>
                        </div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-0.5">Selecciona hora y minutos</p>
                </div>
                <div className="flex divide-x">
                    <div className="flex-1">
                        <div className="p-2 text-center border-b">
                            <span className="text-xs font-medium text-muted-foreground">Hora</span>
                        </div>
                        <div
                            ref={hourScrollRef}
                            className="h-49 overflow-y-auto overflow-x-hidden"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'hsl(var(--primary) / 0.3) transparent',
                                WebkitOverflowScrolling: 'touch',
                                overscrollBehavior: 'contain'
                            }}
                            onWheel={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col p-1">
                                {hours.map((h) => (
                                    <div
                                        key={h}
                                        data-hour={h}
                                        tabIndex={0}
                                        className={cn(
                                            "font-poppins h-9 px-3 rounded-md text-sm tabular-nums transition-colors duration-150 cursor-pointer select-none flex items-center justify-center",
                                            selectedHour === h
                                                ? "bg-primary text-primary-foreground font-semibold"
                                                : "text-foreground hover:bg-accent",
                                        )}
                                        onClick={() => handleTimeSelect(h, selectedMinute, false)}
                                        onKeyDown={(e) => handleKeyDown(e, h, selectedMinute)}
                                    >
                                        {h}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="p-2 text-center border-b">
                            <span className="text-xs font-medium text-muted-foreground">Minutos</span>
                        </div>
                        <div
                            ref={minuteScrollRef}
                            className="h-49 overflow-y-auto overflow-x-hidden"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'hsl(var(--primary) / 0.3) transparent',
                                WebkitOverflowScrolling: 'touch',
                                overscrollBehavior: 'contain'
                            }}
                            onWheel={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col p-1">
                                {minutes.map((m) => (
                                    <div
                                        key={m}
                                        data-minute={m}
                                        tabIndex={0}
                                        className={cn(
                                            "font-poppins h-9 px-3 rounded-md text-sm tabular-nums transition-colors duration-150 cursor-pointer select-none flex items-center justify-center",
                                            selectedMinute === m
                                                ? "bg-primary text-primary-foreground font-semibold"
                                                : "text-foreground hover:bg-accent",
                                        )}
                                        onClick={() => handleTimeSelect(selectedHour, m, false)}
                                        onKeyDown={(e) => handleKeyDown(e, selectedHour, m)}
                                    >
                                        {m}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}