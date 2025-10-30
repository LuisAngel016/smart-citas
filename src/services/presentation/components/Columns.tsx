/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
"use client"

import type { ColumnDef, FilterFn, Row, SortDirection } from "@tanstack/react-table"
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/shared/components/ui/button"
import type { Service } from "@/services/domain/entities/service.entity"
import formatPrice from "@/shared/lib/formatPrice"

const myCustomFilterFn: FilterFn<Partial<Service>> = (
  row: Row<Partial<Service>>,
  _columnId: string,
  filterValue: string
) => {
  const value = (filterValue ?? "").toString().toLowerCase();
  const filterParts = value.split(" ").filter(Boolean);

  // Obtener campos relevantes del servicio (asegurando strings)
  const name = row.original.name ?? "";
  const duration = row.original.duration ?? "";
  const price = row.original.price ?? "";
  const notes = row.original.notes ?? "";

  // Concatenar todos los valores y comparar en minúsculas
  const rowValues = `${name} ${duration} ${price} ${notes}`.toLowerCase();

  return filterParts.every(part => rowValues.includes(part));
}

const SortedIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
  if (isSorted === "asc") {
    return <ChevronUp className="h-4 w-4" />
  }
  if (isSorted === "desc") {
    return <ChevronDown className="h-4 w-4" />
  }
  return null
}


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const createColumns = (
  onEdit: (client: Service) => void,
  onDelete: (client: Service) => void
): ColumnDef<Partial<Service>>[] => [
    {
      accessorKey: "name",
      meta: {
        displayName: "Nombre"
      },
      filterFn: myCustomFilterFn,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
    },
    {
      accessorKey: "price",
      meta: {
        displayName: "Precio"
      },
      filterFn: myCustomFilterFn,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Precio
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
      cell: ({ row }) => {
        const price = row.getValue("price") as string
        return <div>{price ? `${formatPrice(price)}` : "-"}</div>
      }
    },
    {
      accessorKey: "duration",
      meta: {
        displayName: "Duración"
      },
      filterFn: myCustomFilterFn,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Duración
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
      cell: ({ row }) => {
        const duration = row.getValue("duration") as string
        const mins = Number(duration)
        const formatDuration = (minutesVal: number) => {
          if (isNaN(minutesVal) || minutesVal <= 0) return '-'
          const hours = Math.floor(minutesVal / 60)
          const minutes = minutesVal % 60
          if (hours > 0) {
            const hourLabel = hours === 1 ? '1 Hora' : `${hours} Horas`
            return minutes > 0 ? `${hourLabel} y ${minutes} Minutos` : hourLabel
          }
          return `${minutes} Minutos`
        }

        return <div>{formatDuration(mins)}</div>
      }
    },
    {
      accessorKey: "notes",
      meta: {
        displayName: "Notas"
      },
      filterFn: myCustomFilterFn,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Notas
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
      cell: ({ row }) => {
        const notes = row.getValue("notes") as string
        return <div>{notes}</div>
      }
    },
    {
      id: "actions",
      meta: {
        displayName: "Acciones"
      },
      header: "Acciones",
      cell: ({ row }) => {
        const client = row.original

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-600/10"
              onClick={() => {
                if (client.id) {
                  onEdit(client as Service)
                } else {
                  toast.error('No se puede editar este cliente', {
                    position: 'bottom-right'
                  })
                }
              }}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Editar cliente</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                if (client.id) {
                  onDelete(client as Service)
                } else {
                  toast.error('No se puede eliminar este cliente', {
                    position: 'bottom-right'
                  })
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Eliminar cliente</span>
            </Button>
          </div>
        )
      },
    },
  ]

// Exportar una versión por defecto para compatibilidad (sin funcionalidad de edición/eliminación)
export const Columns = createColumns(() => { }, () => { })