import type { Schedule } from "@/schedules/domain/domain/entities/schedule.entity";
import type { SchedulesAPIResponse } from "../dto/response/schedules-api.response";
import type { SlotDurationResponse } from "../dto/response/slot-duration.response";
import type { SlotDuration } from "@/schedules/domain/domain/interfaces/slot-duration.interface";

export class ScheduleMapper {
  static toDomain(result: SchedulesAPIResponse): Schedule[] {
    const data: Schedule[] = result.data.map(item => ({
      id: item.id,
      day: item.day,
      enabled: item.enabled,
      start: item.start,
      end: item.end,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return data;
  }

  static slotDurationFromResponse(resp: SlotDurationResponse): SlotDuration {
    return { slotDuration: resp.slotDuration };
  }
}
