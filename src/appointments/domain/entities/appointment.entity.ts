
export class Appointment {
    constructor(
        public id: string,
        // IDs relacionados (útiles para formularios y relaciones)
        public idClient: string,
        public idService: string,
        // Datos para mostrar
        public clientName: string,
        public clientPhone: string,
        public clientEmail: string,
        public serviceName: string,
        public serviceDuration: string,
        public servicePrice: string,
        public status: AppointmentStatus,
        // Fecha y hora
        public date: string,
        public time: string,
        public notes: string,
        public createdAt: Date = new Date(),
        public updatedAt?: Date
    ) {}
}

export enum AppointmentStatus {
    PENDING = 'pending',     
    COMPLETED = 'completed', 
}
