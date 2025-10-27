import type { IAppointmentRepository } from "../domain/repositories/appointment.repository";
import { Appointment } from "../domain/entities/appointment.entity";

export class CreateAppointmentUseCase {
  constructor(private repository: IAppointmentRepository) {}

  async execute(data: Omit<Appointment, "id">): Promise<Appointment> {
    return await this.repository.create(data);
  }
}
