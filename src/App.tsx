import './App.css'
import Header from "./header/components/Header.tsx";
import {useEffect, useState} from "react";
import {retrieveAllEvents} from "./businesslogic/CalendarAPI.ts";
import {CalendarEvent, mapToEvent} from "./businesslogic/types.ts";
import Sidebar from "./sidebar/components/Sidebar.tsx";
import Calendar from "./calendar/components/Calendar.tsx";

function App() {
    const [calendarDate, setCalendarDate] = useState(new Date()) // State for the main calendar showing the weekly view
    const [sideBarCalendarDate, setSideBarCalendarDate] = useState(new Date()) // State for the sidebar calendar showing the monthly view
    const [sideBarCalendarVisible, setSideBarVisibility] = useState<boolean>(true)

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
            <div className="flex flex-col">
                <Header visible={sideBarCalendarVisible} onMenuToggle={setSideBarVisibility}/>

                <div className="calendar_body grow">
                    <div className="px-2">
                        <Sidebar visible={sideBarCalendarVisible} sidebar={{
                            displayDate: sideBarCalendarDate,
                            selectedDate: calendarDate,
                            onDisplayDateChange: setSideBarCalendarDate,
                            onDateSelected: setCalendarDate,
                        }}/>
                    </div>

                    <Calendar selectedDate={calendarDate} events={events} />
                </div>
            </div>
        </>
    )
}

export default App
