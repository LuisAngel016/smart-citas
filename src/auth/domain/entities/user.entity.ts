
export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public roles: string[],
        public phone?: string,
        public password?: string,
        public createdAt: Date = new Date(),
        public updatedAt?: Date
    ) {}
}
