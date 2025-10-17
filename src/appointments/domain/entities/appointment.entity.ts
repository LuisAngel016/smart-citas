
export class Appointment {
    constructor(
        public id: string,
        public clientName: string,
        public clientPhone: string,
        public clientEmail: string,
        public service: string,
        public date: string,
        public time: string,
        public notes: string,
        public createdAt: Date = new Date(),
        public updatedAt?: Date
    ) {}
}
