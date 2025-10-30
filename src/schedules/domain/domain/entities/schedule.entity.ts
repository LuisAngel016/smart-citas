export class Schedule {
  constructor(
    public id: string,
    public day: string,
    public enabled: boolean,
    public start: string,
    public end: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
