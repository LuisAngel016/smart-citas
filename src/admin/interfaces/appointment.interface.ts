export interface AppointmentFormData {
    clientName: string
    clientPhone: string
    clientEmail: string
    service: string
    date: string
    time: string
    notes: string
}


export interface Appointment extends AppointmentFormData {
    id: string
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
    createdAt: string
    updatedAt?: string
}
