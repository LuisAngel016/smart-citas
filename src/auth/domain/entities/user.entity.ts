
export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public phone?: string,
        public password?: string,
        public role: 'user' | 'admin' = 'user',
        public createdAt: Date = new Date(),
        public updatedAt?: Date
    ) {}
}
