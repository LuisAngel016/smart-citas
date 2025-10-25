
export class Client {
    constructor(
        public id: string,
        public name: string,
        public phone: string,
        public email: string,
        public identification: string,
        public address: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
}
