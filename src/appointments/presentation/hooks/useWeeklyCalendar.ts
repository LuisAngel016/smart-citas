import { useMemo, useCallback } from 'react'
import type { AppointmentPage } from '@/appointments/domain/interfaces/appointment-page.interface'
import type { Appointment } from '@/appointments/domain/entities/appointment.entity'
import type { EventClickArg, EventMountArg, EventInput } from '@fullcalendar/core/index.js'
import type { DateClickArg } from '@fullcalendar/interaction/index.js'

export const useWeeklyCalendar = (
    appointments: AppointmentPage | undefined,
    onEditAppointment: (appointment: Appointment) => void,
) => {
    const calculateEndTime = useCallback((date: string, time: string, duration: string): string => {
        const [hours, minutes] = duration.split(':').map(Number)
        const startDateTime = new Date(`${date}T${time}`)
        startDateTime.setHours(startDateTime.getHours() + hours)
        startDateTime.setMinutes(startDateTime.getMinutes() + minutes)
        return startDateTime.toISOString()
    }, [])

    const events = useMemo<EventInput[]>(() => {
        if (!appointments?.data) return []

        return appointments.data.map((appointment) => {
            const startDateTime = `${appointment.date}T${appointment.time}`
            const endDateTime = appointment.serviceDuration
                ? calculateEndTime(appointment.date, appointment.time, appointment.serviceDuration)
                : undefined

            return {
                id: appointment.id,
                title: appointment.serviceName || 'Cita sin servicio',
                start: startDateTime,
                end: endDateTime,
                backgroundColor: '#3b82f6',
                borderColor: '#2563eb',
                extendedProps: {
                    appointment: appointment, // Guardar el appointment completo
                    clientName: appointment.clientName,
                    clientPhone: appointment.clientPhone,
                    serviceName: appointment.serviceName,
                    servicePrice: appointment.servicePrice,
                    notes: appointment.notes,
                }
            } as EventInput
        })
    }, [appointments, calculateEndTime])

    const handleEventClick = useCallback((clickInfo: EventClickArg) => {
        const appointmentId = clickInfo.event.id
        const appointment = appointments?.data.find(apt => apt.id === appointmentId)

        if (appointment) {
            onEditAppointment(appointment)
        }
    }, [appointments, onEditAppointment])

    const handleEventDidMount = useCallback((arg: EventMountArg) => {
        try {
            const el = arg.el as HTMLElement
            if (el) {
                el.classList.add('cursor-pointer', 'hover:bg-primary/20', 'hover:text-primary', 'transition-colors')
            }
        } catch {
            // noop
        }
    }, [])

    const handleEventWillUnmount = useCallback((arg: EventMountArg) => {
        try {
            const el = arg.el as HTMLElement
            if (el) {
                el.classList.remove('cursor-pointer', 'hover:bg-primary/20', 'hover:text-primary', 'transition-colors')
            }
        } catch {
            // noop
        }
    }, [])

    
    const handleDateClick = useCallback((arg: DateClickArg) => {
        // Obtener la fecha del click sin problemas de zona horaria
        const clickedDateStr = arg.dateStr.split('T')[0] // Obtener solo YYYY-MM-DD
        
        // Buscar si hay eventos en esta fecha
        const eventsOnDate = events.filter(event => {
            const eventStart = event.start as string
            const eventDateStr = eventStart.split('T')[0] // Obtener solo YYYY-MM-DD
            return eventDateStr === clickedDateStr
        })

        // Si hay eventos, abrir el primero
        if (eventsOnDate.length > 0 && eventsOnDate[0].extendedProps?.appointment) {
            onEditAppointment(eventsOnDate[0].extendedProps.appointment as Appointment)
        }
    }, [events, onEditAppointment])

    return {
        events,
        handleEventClick,
        handleEventDidMount,
        handleEventWillUnmount,
        handleDateClick
    }
}
