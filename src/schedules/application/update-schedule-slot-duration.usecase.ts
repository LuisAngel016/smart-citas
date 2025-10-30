import type { IScheduleRepository } from "@/schedules/domain/domain/repositories/schedule.repository";
import type { UpdateSlotDurationDTO } from "@/schedules/domain/domain/interfaces/slot-duration.interface";

export class UpdateScheduleSlotDurationUseCase {
  constructor(private readonly repository: IScheduleRepository) {}

  async execute(data: UpdateSlotDurationDTO) {
    return await this.repository.updateSlotDuration(data);
  }
}
