export interface CreateScheduleDTO {
  day: string; 
  enabled: boolean;
  start?: string; 
  end?: string;   
  createdBy?: string;   
}

export type UpdateScheduleDTO = CreateScheduleDTO
