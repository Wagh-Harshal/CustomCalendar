import React, { useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import EventModal from "./EventModal"
import EventDetailsModal from "./EventDetailsModal"

let events = JSON.parse(sessionStorage.getItem("events"));
events = events ?? INITIAL_EVENTS;

let Calendar = () => {
  let [currentEvents, updateCurrentEvents] = useState(events);
  const myRef = useRef();
  const eventDetailsRef = useRef();

  let handleAddEvent = (data) => {
    const eventsData = [...currentEvents, data];
    updateCurrentEvents(eventsData);
    sessionStorage.setItem("events", JSON.stringify(eventsData));
    myRef.current.dismissModal();
  }
  let handleDateSelect = (selectInfo) => {
    myRef.current.showModal(selectInfo.startStr);
  }

  let handleEventClick = (clickInfo) => {
    const title = clickInfo.event.title;
    const description = clickInfo.event.extendedProps.description;
    const startHour = clickInfo.event.extendedProps.startHour;
    const startMinute = clickInfo.event.extendedProps.startMinute;
    const endtHour = clickInfo.event.extendedProps.endtHour;
    const endMinute = clickInfo.event.extendedProps.endMinute;
    const date = clickInfo.event.startStr;
    eventDetailsRef.current.showModal(
      { title, description, date, startHour, startMinute, endtHour, endMinute }
    );
  }

  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <EventModal ref={myRef} addEvent={handleAddEvent}></EventModal>
        <EventDetailsModal ref={eventDetailsRef} ></EventDetailsModal>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'title',
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
            right: 'prev,next today'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={3}
          events={currentEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  )
}

export default Calendar;