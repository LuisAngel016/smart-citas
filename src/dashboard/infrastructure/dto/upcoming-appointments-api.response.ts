export interface UpcomingAppointmentAPIResponse {
  date: string;
  time: string;
  client: string;
  service: string;
  status: "Confirmada" | "Pendiente" | "Cancelada";
  color: string;
}
