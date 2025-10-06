export interface ClientFormData {
    nombre: string
    email: string
    telefono: string
    direccion?: string
    notas?: string
}

export interface Client extends ClientFormData {
    id: string
    citas: number
    ultimaCita?: string
    createdAt: string
    updatedAt?: string
}
