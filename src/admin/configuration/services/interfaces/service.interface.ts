export type ServiceInput = {
    name: string
    duration: string
    price: number
    notes?: string
}

export type Service = ServiceInput & { id: string }
