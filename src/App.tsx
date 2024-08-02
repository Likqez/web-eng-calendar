import './App.css'
import Header from "./header/components/Header.tsx";
import SidebarCalendar from "./sidebar/components/SidebarCalendar.tsx";
import {SidebarCalendarProps} from "./sidebar/components/SidebarCalendar.tsx";
import {useEffect, useState} from "react";
import {retrieveAllEvents} from "./businesslogic/CalendarAPI.ts";
import {CalendarEvent, mapToEvent} from "./businesslogic/types.ts";

function App() {
    const [calendarDate, setCalendarDate] = useState(new Date()) // State for the main calendar showing the weekly view
    const [sideBarCalendarDate, setSideBarCalendarDate] = useState(new Date()) // State for the sidebar calendar showing the monthly view
    const [sideBarCalendarVisible, setSideBarVisibility] = useState<boolean>(true)

    const sidebarCalendarProp: SidebarCalendarProps = {
        displayDate: calendarDate,
        selectedDate: sideBarCalendarDate,
        onDisplayDateChange: setCalendarDate,
        onDateSelected: setSideBarCalendarDate,
    }

    // State for the events
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const retrievedEvents = await retrieveAllEvents();
                setEvents(retrievedEvents.map(mapToEvent));
            } catch (err) {
                setError("Failed to retrieve events");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <Header/>
            <SidebarCalendar displayDate={sideBarCalendarDate} onDisplayDateChange={setSideBarCalendarDate}
                             selectedDate={calendarDate} onDateSelected={setCalendarDate}/>
            <br/><br/><br/>
            <h3 className="text-xl">Debug Info:</h3>

            SelectedDate (Week to show) : {calendarDate.toDateString()}<br/>
            sidebarDate (Month to show) : {sideBarCalendarDate.toDateString()}

            <br/> <br/>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-700">Error: {error}</div>}
        </>
    )
}

export default App
