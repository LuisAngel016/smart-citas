import { Schedule } from "../entities/schedule.entity";
import type { UpdateScheduleDTO } from "../interfaces/create-schedule.dto";
import type { SlotDuration, UpdateSlotDurationDTO } from "../interfaces/slot-duration.interface";

export interface IScheduleRepository {
  getAll(): Promise<Schedule[]>;
  updateMany(schedules: UpdateScheduleDTO[]): Promise<Schedule[]>;

  // Slot duration
  getSlotDuration(): Promise<SlotDuration>;
  updateSlotDuration(data: UpdateSlotDurationDTO): Promise<SlotDuration>;
}
