import type { IAppointmentRepository } from "../domain/repositories/appointment.repository";
import type { AppointmentPage } from "../domain/interfaces/appointment-page.interface";


export class GetAllAppointmentsUseCase {
  constructor(private repository: IAppointmentRepository) {}

  async execute(): Promise<AppointmentPage> {
    return await this.repository.getAll();
  }
}
