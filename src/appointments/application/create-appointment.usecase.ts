import type { IAppointmentRepository } from "../domain/repositories/appointment.repository";
import type { CreateAppointmentDTO } from "../domain/interfaces/create-appointment.dto";
import { Appointment } from "../domain/entities/appointment.entity";

export class CreateAppointmentUseCase {
  constructor(private repository: IAppointmentRepository) {}

  async execute(data: CreateAppointmentDTO): Promise<Appointment> {
    return await this.repository.create(data);
  }
}
