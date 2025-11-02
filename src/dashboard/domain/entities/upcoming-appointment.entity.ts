export class UpcomingAppointment {
  constructor(
    public date: string,
    public time: string,
    public client: string,
    public service: string,
    public status: "Confirmada" | "Pendiente" | "Cancelada",
    public color: string,
  ) {}
}
