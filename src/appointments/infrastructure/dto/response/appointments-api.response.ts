import type { AppointmentAPIResponse } from "./appointment-api.response";

export interface AppointmentsApiResponse {
  data: AppointmentAPIResponse[];
  total: number;
}