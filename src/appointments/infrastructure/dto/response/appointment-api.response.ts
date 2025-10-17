export interface AppointmentAPIResponse {
  id: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  created_at: string;
  updated_at?: string;
}
