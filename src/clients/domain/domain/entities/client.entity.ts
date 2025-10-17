
export class Client {
    constructor(
        public id: string,
        public nombre: string,
        public telefono: string,
        public email: string,
        public direccion?: string,
        public notas?: string,
        public createdAt: Date = new Date(),
        public updatedAt?: Date
    ) {}
}
