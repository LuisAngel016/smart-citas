import { AxiosHttpAdapter } from "../../shared/api/adapters/axios-http.adapter";
import { CreateAppointmentUseCase } from "../application/create-appointment.usecase";
import { DeleteAppointmentUseCase } from "../application/delete-appointment.usecase";
import { GetAllAppointmentsUseCase } from "../application/get-all-appointments.usecase";
import { GetAppointmentByIdUseCase } from "../application/get-appointment-by-id.usecase";
import { UpdateAppointmentUseCase } from "../application/update-appointment.usecase";
import { UpdateStatusAppointmentUseCase } from "../application/update-status-appointment.usecase";
import { AppointmentRepositoryImpl } from "../infrastructure/repositories/appointment.repository.impl";

const httpClient = new AxiosHttpAdapter();

export const appointmentRepository = new AppointmentRepositoryImpl(httpClient);

// Use Cases
export const appointmentContainer = {
	getAllAppointmentsUseCase: new GetAllAppointmentsUseCase(appointmentRepository),
	getAppointmentByIdUseCase: new GetAppointmentByIdUseCase(appointmentRepository),
	createAppointmentUseCase: new CreateAppointmentUseCase(appointmentRepository),
	updateAppointmentUseCase: new UpdateAppointmentUseCase(appointmentRepository),
	updateStatusAppointmentUseCase: new UpdateStatusAppointmentUseCase(appointmentRepository),
	deleteAppointmentUseCase: new DeleteAppointmentUseCase(appointmentRepository),
};
