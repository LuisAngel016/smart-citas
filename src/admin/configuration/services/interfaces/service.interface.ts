export type ServiceInput = {
    name: string
    duration: string
    price: string
    notes?: string
}

export type Service = ServiceInput & { id: string }
