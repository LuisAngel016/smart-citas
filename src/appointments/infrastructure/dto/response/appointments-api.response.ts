import type { AppointmentAPIResponse } from "./appointment-api.response";

export interface AppointmentsApiResponse {
  results: AppointmentAPIResponse[];
  total: number;
}
