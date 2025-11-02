export interface UpcomingAppointmentAPIResponse {
  time: string;
  client: string;
  service: string;
  status: "Confirmada" | "Pendiente" | "Cancelada";
  color: string;
}
