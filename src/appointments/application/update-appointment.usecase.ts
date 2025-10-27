import type { IAppointmentRepository } from "../domain/repositories/appointment.repository";
import { Appointment } from "../domain/entities/appointment.entity";

export class UpdateAppointmentUseCase {
  constructor(private repository: IAppointmentRepository) {}

  async execute(id: string, data: Partial<Omit<Appointment, "id">>): Promise<Appointment> {
    return await this.repository.update(id, data);
  }
}
