import React, { Component } from 'react'  
import FullCalendar from "@fullcalendar/react";  
import dayGridPlugin from "@fullcalendar/daygrid";  
const events = [{ title: "Today", date: new Date() }];  
const Calendar = () => {  
    return (  
        <div className="container" style={{ margin: "20px" }}>                  
            <FullCalendar  
                defaultView="dayGridMonth"  
                plugins={[dayGridPlugin]}  
                events={events}  
            />  
        </div>  
    );  
}  
  
export default Calendar  