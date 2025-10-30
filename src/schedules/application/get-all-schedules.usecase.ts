import type { IScheduleRepository } from "@/schedules/domain/domain/repositories/schedule.repository";

export class GetAllSchedulesUseCase {
  constructor(private readonly repository: IScheduleRepository) {}

  async execute() {
    return await this.repository.getAll();
  }
}
