import type { Appointment, AppointmentFormData } from "@/admin/appointments/interfaces/appointment.interface"

/**
 * Servicio para manejar las operaciones relacionadas con citas
 * Aquí se centraliza toda la lógica de negocio y llamadas a API
 */

/**
 * Crea una nueva cita
 * @param data - Datos del formulario de cita
 * @returns Promesa con la cita creada
 */
export const createAppointment = async (data: AppointmentFormData): Promise<Appointment> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Error al crear la cita')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en createAppointment:', error)
        throw error
    }
}

/**
 * Obtiene todas las citas
 * @returns Promesa con el listado de citas
 */
export const getAppointments = async (): Promise<Appointment[]> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch('/api/appointments')

        if (!response.ok) {
            throw new Error('Error al obtener las citas')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en getAppointments:', error)
        throw error
    }
}

/**
 * Obtiene una cita por ID
 * @param id - ID de la cita
 * @returns Promesa con la cita encontrada
 */
export const getAppointmentById = async (id: string): Promise<Appointment> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch(`/api/appointments/${id}`)

        if (!response.ok) {
            throw new Error('Error al obtener la cita')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en getAppointmentById:', error)
        throw error
    }
}

/**
 * Actualiza una cita existente
 * @param id - ID de la cita
 * @param data - Datos actualizados de la cita
 * @returns Promesa con la cita actualizada
 */
export const updateAppointment = async (id: string, data: Partial<AppointmentFormData>): Promise<Appointment> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch(`/api/appointments/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Error al actualizar la cita')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en updateAppointment:', error)
        throw error
    }
}

/**
 * Elimina una cita
 * @param id - ID de la cita a eliminar
 * @returns Promesa indicando el éxito de la operación
 */
export const deleteAppointment = async (id: string): Promise<void> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch(`/api/appointments/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error('Error al eliminar la cita')
        }
    } catch (error) {
        console.error('Error en deleteAppointment:', error)
        throw error
    }
}

/**
 * Cambia el estado de una cita
 * @param id - ID de la cita
 * @param status - Nuevo estado de la cita
 * @returns Promesa con la cita actualizada
 */
export const updateAppointmentStatus = async (
    id: string,
    status: Appointment['status']
): Promise<Appointment> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch(`/api/appointments/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        })

        if (!response.ok) {
            throw new Error('Error al actualizar el estado de la cita')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en updateAppointmentStatus:', error)
        throw error
    }
}
