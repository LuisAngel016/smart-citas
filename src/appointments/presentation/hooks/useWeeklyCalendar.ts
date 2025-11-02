import { useMemo, useCallback } from 'react'
import type { AppointmentPage } from '@/appointments/domain/interfaces/appointment-page.interface'
import type { Appointment } from '@/appointments/domain/entities/appointment.entity'
import type { EventClickArg, EventMountArg, EventInput } from '@fullcalendar/core/index.js'
import type { DateClickArg } from '@fullcalendar/interaction/index.js'

export const useWeeklyCalendar = (
    appointments: AppointmentPage | undefined,
    onEditAppointment: (appointment: Appointment) => void,
) => {
    // Parse date (YYYY-MM-DD) and time (HH:mm or HH:mm:ss) into ISO string
    const parseDateTime = useCallback((dateStr: string, timeStr: string): string | null => {
        if (!dateStr || !timeStr) return null
        
        const [year, month, day] = dateStr.split('-').map(Number)
        if (!year || !month || !day) return null

        const [hours, minutes, seconds = 0] = timeStr.split(':').map(Number)
        if (hours === undefined || minutes === undefined) return null

        const dt = new Date(year, month - 1, day, hours, minutes, seconds)
        return isNaN(dt.getTime()) ? null : dt.toISOString()
    }, [])

    const calculateEndTime = useCallback((startISO: string, duration: string): string | undefined => {
        const startDateTime = new Date(startISO)
        if (isNaN(startDateTime.getTime())) return undefined

        let addMinutes = 0
        
        if (duration.includes(':')) {
            const [hours, mins] = duration.split(':').map(Number)
            addMinutes = (hours || 0) * 60 + (mins || 0)
        } else {
            addMinutes = Number(duration) || 0
        }

        startDateTime.setMinutes(startDateTime.getMinutes() + addMinutes)
        return isNaN(startDateTime.getTime()) ? undefined : startDateTime.toISOString()
    }, [])

    const events = useMemo<EventInput[]>(() => {
        if (!appointments?.data) return []

        return appointments.data.reduce<EventInput[]>((acc, appointment) => {
            const startISO = parseDateTime(appointment.date, appointment.time)
            if (!startISO) return acc

            const endDateTime = appointment.serviceDuration
                ? calculateEndTime(startISO, appointment.serviceDuration)
                : undefined

            acc.push({
                id: appointment.id,
                title: appointment.serviceName || 'Cita sin servicio',
                start: startISO,
                end: endDateTime,
                backgroundColor: '#7dd3fc',
                borderColor: '#38bdf8',    
                textColor: '#0c4a6e', 
                extendedProps: {
                    appointment,
                    clientName: appointment.clientName,
                    clientPhone: appointment.clientPhone,
                    serviceName: appointment.serviceName,
                    servicePrice: appointment.servicePrice,
                    notes: appointment.notes,
                }
            })
            
            return acc
        }, [])
    }, [appointments, calculateEndTime, parseDateTime])

    const handleEventClick = useCallback((clickInfo: EventClickArg) => {
        const appointment = clickInfo.event.extendedProps.appointment as Appointment
        if (appointment) {
            onEditAppointment(appointment)
        }
    }, [onEditAppointment])

    const toggleEventClasses = useCallback((el: HTMLElement, add: boolean) => {
        const classes = ['cursor-pointer', 'hover:bg-primary/20', 'hover:text-primary', 'transition-colors']
        el.classList[add ? 'add' : 'remove'](...classes)
    }, [])

    const handleEventDidMount = useCallback((arg: EventMountArg) => {
        toggleEventClasses(arg.el as HTMLElement, true)
    }, [toggleEventClasses])

    const handleEventWillUnmount = useCallback((arg: EventMountArg) => {
        toggleEventClasses(arg.el as HTMLElement, false)
    }, [toggleEventClasses])

    const handleDateClick = useCallback((arg: DateClickArg) => {
        const clickedDate = arg.dateStr.split('T')[0]
        
        const firstEvent = events.find(event => {
            const eventDate = (event.start as string).split('T')[0]
            return eventDate === clickedDate
        })

        if (firstEvent?.extendedProps?.appointment) {
            onEditAppointment(firstEvent.extendedProps.appointment as Appointment)
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