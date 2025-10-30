export interface CreateAppointmentDTO {
  id_client: string
  id_service: string
  date: string // yyyy-MM-dd
  time: string // HH:mm
  notes?: string
  createdBy: string
}

export type UpdateAppointmentDTO = Partial<CreateAppointmentDTO>
