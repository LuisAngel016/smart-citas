/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
"use client"

import type { ColumnDef, FilterFn, Row, SortDirection } from "@tanstack/react-table"
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/shared/components/ui/button"
import type { Client } from "@/clients/domain/domain/entities/client.entity"

const myCustomFilterFn: FilterFn<Partial<Client>> = (
  row: Row<Partial<Client>>,
  _columnId: string,
  filterValue: string
) => {
  const value = (filterValue ?? "").toString().toLowerCase();
  const filterParts = value.split(" ").filter(Boolean);

  // Obtener campos relevantes del cliente (asegurando strings)
  const name = row.original.name ?? "";
  const email = row.original.email ?? "";
  const identification = row.original.identification ?? "";
  const phone = row.original.phone ?? "";
  const address = row.original.address ?? "";

  // Concatenar todos los valores y comparar en minúsculas
  const rowValues = `${name} ${email} ${identification} ${phone} ${address}`.toLowerCase();

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
  onEdit: (client: Client) => void,
  onDelete: (client: Client) => void
): ColumnDef<Partial<Client>>[] => [
    {
      accessorKey: "identification",
      meta: {
        displayName: "Identificación"
      },
      filterFn: myCustomFilterFn,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Identificación
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
    },
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
      accessorKey: "email",
      meta: {
        displayName: "Correo"
      },
      filterFn: myCustomFilterFn,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Correo
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
    },
    {
      accessorKey: "phone",
      meta: {
        displayName: "Teléfono"
      },
      filterFn: myCustomFilterFn,
      cell: ({ row }) => {
        const raw = row.getValue("phone")
        const phone = raw == null ? "" : String(raw)

        // Si comienza con '+' eliminamos el prefijo de código de país
        const formatted = phone.startsWith("+")
          ? phone.replace(/^\+\d{1,3}[\s-]?/, "")
          : phone

        return <div>{formatted}</div>
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Teléfono
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
    },
    {
      accessorKey: "address",
      meta: {
        displayName: "Dirección"
      },
      filterFn: myCustomFilterFn,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Dirección
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        )
      },
      cell: ({ row }) => {
        const address = row.getValue("address") as string
        return <div>{address}</div>
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
                  onEdit(client as Client)
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
                  onDelete(client as Client)
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