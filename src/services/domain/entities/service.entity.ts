
export class Service {
    constructor(
        public id: string,
        public name: string,
        public duration: string,
        public price: string,
        public notes: string,
        public createdBy: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
}
