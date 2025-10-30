import type { IScheduleRepository } from "@/schedules/domain/domain/repositories/schedule.repository";

export class GetScheduleSlotDurationUseCase {
  constructor(private readonly repository: IScheduleRepository) {}

  async execute() {
    return await this.repository.getSlotDuration();
  }
}
