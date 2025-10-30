import type { IScheduleRepository } from "@/schedules/domain/domain/repositories/schedule.repository";
import type { UpdateScheduleDTO } from "@/schedules/domain/domain/interfaces/create-schedule.dto";

export class UpdateScheduleUseCase {
  constructor(private readonly repository: IScheduleRepository) {}

  async executeMany(schedules: UpdateScheduleDTO[]) {
    return await this.repository.updateMany(schedules);
  }
}
