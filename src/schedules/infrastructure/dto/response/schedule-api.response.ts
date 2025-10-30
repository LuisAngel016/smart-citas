export interface ScheduleAPIResponse {
  id: string;
  day: string;
  enabled: boolean;
  start: string;
  end: string;
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
}
