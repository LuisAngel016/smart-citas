import type { IAppointmentRepository } from "../domain/repositories/appointment.repository";
import { Appointment } from "../domain/entities/appointment.entity";
import type { UpdateAppointmentDTO } from "../domain/interfaces/create-appointment.dto";

export class UpdateAppointmentUseCase {
  constructor(private repository: IAppointmentRepository) {}

  async execute(id: string, data: UpdateAppointmentDTO): Promise<Appointment> {
    return await this.repository.update(id, data);
  }
}
