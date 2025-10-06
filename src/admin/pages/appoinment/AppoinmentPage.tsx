import { WeeklyCalendar } from "@/admin/components/WeeklyCalendar"
import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"

export const AppoinmentPage = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Citas</h1>
                    <p className="text-muted-foreground mt-1">Gestiona tu calendario de citas</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrar
                    </Button>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Cita
                    </Button>
                </div>
            </div>

            <WeeklyCalendar />
        </div>
    )
}
