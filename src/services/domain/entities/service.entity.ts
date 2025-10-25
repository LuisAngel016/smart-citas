
export class Service {
    constructor(
        public id: string,
        public name: string,
        public duration: string,
        public price: number,
        public notes?: string,
        public createdAt: Date = new Date(),
        public updatedAt?: Date
    ) {}
}
