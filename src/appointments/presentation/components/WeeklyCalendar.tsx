import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { AppointmentPage } from '@/appointments/domain/interfaces/appointment-page.interface'
import type { Appointment } from '@/appointments/domain/entities/appointment.entity'
import { useWeeklyCalendar } from '@/appointments/presentation/hooks/useWeeklyCalendar'
import { useState, useEffect } from 'react'
import '../css/calendar-styles.css'

interface WeeklyCalendarProps {
    appointments: AppointmentPage;
    isLoading: boolean;
    onEditAppointment: (appointment: Appointment) => void;
}

export const WeeklyCalendar = ({ appointments, isLoading, onEditAppointment }: WeeklyCalendarProps) => {
    const { events, handleEventClick, handleEventDidMount, handleEventWillUnmount, handleDateClick } = useWeeklyCalendar(appointments, onEditAppointment)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (isLoading) {
        return (
            <div className="mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Cargando calendario...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground dark:text-gray-100">
                        Calendario de Citas
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400 mt-1">
                        Gestiona tu calendario de citas
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-50 rounded-lg border border-blue-100 dark:border-gray-700 dark:bg-gray-800 self-start sm:self-auto">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs sm:text-sm font-semibold text-blue-700">
                        {appointments?.total || 0} citas
                    </span>
                </div>
            </div>

            {/* Calendar */}
            <div className="calendar-wrapper">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={isMobile ? 'timeGridDay' : 'timeGridWeek'}
                    headerToolbar={{
                        left: isMobile ? 'prev,next' : 'prev,next today',
                        center: 'title',
                        right: isMobile ? 'today' : 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={events}
                    editable={false}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    eventDidMount={handleEventDidMount}
                    eventWillUnmount={handleEventWillUnmount}
                    locale="es"
                    height="auto"
                    buttonText={{
                        today: 'Hoy',
                        month: 'Mes',
                        week: 'Semana',
                        day: 'Día',
                    }}
                    slotMinTime="08:00:00"
                    slotMaxTime="20:00:00"
                    slotDuration="00:30:00"
                    allDaySlot={false}
                    nowIndicator={true}
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }}
                    // Opciones adicionales para mobile
                    dayHeaderFormat={isMobile ? { weekday: 'short', day: 'numeric' } : { weekday: 'short', day: 'numeric', month: 'short' }}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }}
                />
            </div>
        </div>
    )
}