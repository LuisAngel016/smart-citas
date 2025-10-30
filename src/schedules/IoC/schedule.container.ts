import { httpClient } from "@/shared/api";
import { ScheduleRepositoryImpl } from "../infrastructure/repositories/schedule.repository.impl";
import { GetAllSchedulesUseCase } from "../application/get-all-schedules.usecase";
import { UpdateScheduleUseCase } from "../application/update-schedule.usecase";
import { GetScheduleSlotDurationUseCase } from "../application/get-schedule-slot-duration.usecase";
import { UpdateScheduleSlotDurationUseCase } from "../application/update-schedule-slot-duration.usecase";

// Repository
const scheduleRepository = new ScheduleRepositoryImpl(httpClient);

// Use Cases
export const scheduleContainer = {
  getAllSchedulesUseCase: new GetAllSchedulesUseCase(scheduleRepository),
  updateScheduleUseCase: new UpdateScheduleUseCase(scheduleRepository),
  getScheduleSlotDurationUseCase: new GetScheduleSlotDurationUseCase(scheduleRepository),
  updateScheduleSlotDurationUseCase: new UpdateScheduleSlotDurationUseCase(scheduleRepository),
};
