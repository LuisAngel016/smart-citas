import type { IAppointmentRepository } from "../domain/repositories/appointment.repository";
import { Appointment } from "../domain/entities/appointment.entity";


export class GetAppointmentsUseCase {
  constructor(private repository: IAppointmentRepository) {}

  async execute(): Promise<Appointment[]> {
    return await this.repository.getAll();
  }
}
