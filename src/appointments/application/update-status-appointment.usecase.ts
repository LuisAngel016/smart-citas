import type { IAppointmentRepository } from "../domain/repositories/appointment.repository";
import { Appointment } from "../domain/entities/appointment.entity";

export class UpdateStatusAppointmentUseCase {
  constructor(private repository: IAppointmentRepository) {}

  async execute(id: string): Promise<Appointment> {
    return await this.repository.updateStatus(id);
  }
}
