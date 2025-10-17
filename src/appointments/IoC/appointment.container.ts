import { AxiosHttpAdapter } from "../../shared/api/adapters/axios-http.adapter";
import { AppointmentRepositoryImpl } from "../infraestructure/repositories/appointment.repository.impl";

const httpClient = new AxiosHttpAdapter();

export const appointmentRepository = new AppointmentRepositoryImpl(httpClient);
