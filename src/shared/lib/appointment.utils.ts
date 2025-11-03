import { AppointmentStatus } from "@/appointments/domain/entities/appointment.entity";
import { parse, isToday, isBefore, startOfDay, addMinutes, isAfter } from "date-fns";

/**
 * Verifica si una cita puede ser marcada como completada
 * Reglas:
 * - La cita debe ser de hoy o de días anteriores
 * - Si es de hoy, debe haber finalizado (hora inicio + duración <= hora actual)
 * - La cita no debe estar ya completada
 *
 * @param date Fecha en formato "yyyy-MM-dd"
 * @param time Hora en formato "HH:mm"
 * @param serviceDuration Duración del servicio en minutos (string)
 * @param status Estado actual de la cita (AppointmentStatus)
 */
export const canCompleteAppointment = (
  date: string,
  time: string,
  serviceDuration: string,
  status: AppointmentStatus,
): boolean => {
  // Si ya está completada, no se puede completar
  if (status === AppointmentStatus.COMPLETED) {
    return false;
  }

  try {
    // Parsear la fecha de la cita (formato yyyy-MM-dd)
    const appointmentDate = parse(date, "yyyy-MM-dd", new Date());
    const today = startOfDay(new Date());
    const now = new Date();

    // Si la cita es de días anteriores, se puede completar
    if (isBefore(appointmentDate, today)) {
      return true;
    }

    // Si la cita es de hoy, verificar que haya finalizado
    if (isToday(appointmentDate)) {
      // Parsear la hora de inicio (formato HH:mm)
      const [hours, minutes] = time.split(':').map(Number);
      
      // Crear fecha/hora completa de inicio de la cita
      const appointmentStart = new Date(appointmentDate);
      appointmentStart.setHours(hours, minutes, 0, 0);
      
      // Calcular hora de finalización (inicio + duración)
      const durationMinutes = parseInt(serviceDuration, 10) || 0;
      const appointmentEnd = addMinutes(appointmentStart, durationMinutes);
      
      // La cita se puede completar solo si ya finalizó
      return isAfter(now, appointmentEnd);
    }

    // Si es una fecha futura, no se puede completar
    return false;
  } catch (error) {
    console.error("Error al validar fecha de cita:", error);
    return false;
  }
};

/**
 * Obtiene el mensaje de tooltip cuando no se puede completar una cita
 * Devuelve cadena vacía si se puede completar
 */
export const getCompleteDisabledReason = (
  date: string,
  time: string,
  serviceDuration: string,
  status: AppointmentStatus,
): string => {
  if (status === AppointmentStatus.COMPLETED) {
    return "Esta cita ya está completada";
  }

  try {
    const appointmentDate = parse(date, "yyyy-MM-dd", new Date());
    const today = startOfDay(new Date());
    const now = new Date();

    // Si es una fecha futura
    if (!isToday(appointmentDate) && !isBefore(appointmentDate, today)) {
      return "Solo puedes completar citas de hoy o de días anteriores";
    }

    // Si es hoy, verificar si la cita ya finalizó
    if (isToday(appointmentDate)) {
      const [hours, minutes] = time.split(':').map(Number);
      const appointmentStart = new Date(appointmentDate);
      appointmentStart.setHours(hours, minutes, 0, 0);
      
      const durationMinutes = parseInt(serviceDuration, 10) || 0;
      const appointmentEnd = addMinutes(appointmentStart, durationMinutes);
      
      if (!isAfter(now, appointmentEnd)) {
        // Formatear la hora de finalización para mostrarla
        const endHours = appointmentEnd.getHours().toString().padStart(2, '0');
        const endMinutes = appointmentEnd.getMinutes().toString().padStart(2, '0');
        return `Esta cita finaliza a las ${endHours}:${endMinutes}`;
      }
    }
  } catch (error) {
    console.error("Error al validar fecha de cita (getCompleteDisabledReason):", error);
    return "Fecha u hora inválida";
  }

  return "";
};