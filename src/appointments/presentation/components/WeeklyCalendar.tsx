import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { AppointmentPage } from '@/appointments/domain/interfaces/appointment-page.interface'
import type { Appointment } from '@/appointments/domain/entities/appointment.entity'
import { useWeeklyCalendar } from '@/appointments/presentation/hooks/useWeeklyCalendar'
import '../css/calendar-styles.css'

interface WeeklyCalendarProps {
    appointments: AppointmentPage;
    isLoading: boolean;
    onEditAppointment: (appointment: Appointment) => void;
}

export const WeeklyCalendar = ({ appointments, isLoading, onEditAppointment }: WeeklyCalendarProps) => {
    const { events, handleEventClick, handleEventDidMount, handleEventWillUnmount, handleDateClick } = useWeeklyCalendar(appointments, onEditAppointment)

    if (isLoading) {
        return (
            <div className="mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
        <div className="mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Calendario de Citas</h1>
                    <p className="text-sm text-gray-500 mt-1">Gestiona tu calendario de citas</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-blue-700">
                        {appointments?.total || 0} citas
                    </span>
                </div>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
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
            />
        </div>
    )
}