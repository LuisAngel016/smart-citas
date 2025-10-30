import type { Schedule } from "@/schedules/domain/domain/entities/schedule.entity";
import type { IScheduleRepository } from "@/schedules/domain/domain/repositories/schedule.repository";
import type { IHttpClient } from "@/shared/api/interfaces/http-client.interface";
import { ScheduleMapper } from "../mappers/schedule.mapper";
import type { UpdateScheduleDTO } from "@/schedules/domain/domain/interfaces/create-schedule.dto";
import type { ScheduleAPIResponse } from "../dto/response/schedule-api.response";
import type { SlotDurationResponse } from "../dto/response/slot-duration.response";
import type { SlotDuration, UpdateSlotDurationDTO } from "@/schedules/domain/domain/interfaces/slot-duration.interface";

export class ScheduleRepositoryImpl implements IScheduleRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(): Promise<Schedule[]> {
    const data = await this.httpClient.get<ScheduleAPIResponse[]>("/schedule");
    const schedules = ScheduleMapper.toDomain(data);
    return schedules;
  }

  async updateMany(schedules: UpdateScheduleDTO[]): Promise<Schedule[]> {
    const data = await this.httpClient.patch<ScheduleAPIResponse[]>("/schedule", schedules);
    const schedule = ScheduleMapper.toDomain(data);
    return schedule;
  }

  async getSlotDuration(): Promise<SlotDuration> {
    const { data } = await this.httpClient.get<SlotDurationResponse>("/schedule/slot-duration");
    return ScheduleMapper.slotDurationFromResponse(data);
  }

  async updateSlotDuration(dataDto: UpdateSlotDurationDTO): Promise<SlotDuration> {
    const { data } = await this.httpClient.patch<SlotDurationResponse>("/schedule/slot-duration", dataDto);
    return ScheduleMapper.slotDurationFromResponse(data);
  }
}
