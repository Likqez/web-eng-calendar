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


    const createEventModal = () => {
        console.log("clicked!")
    }

    return (
        <>
            <div className="flex flex-col h-svh">
                <Header />

                <div className="flex flex-row w-screen overflow-auto">
                    <div className="flex-col basis-32 shrink-0 px-2">
                        <Sidebar
                            sidebar={{
                                displayDate: sideBarCalendarDate,
                                selectedDate: calendarDate,
                                onDisplayDateChange: setSideBarCalendarDate,
                                onDateSelected: setCalendarDate,
                            }}
                            onClickCreateEntry={createEventModal}
                        />
                    </div>
                    <Calendar selectedDate={calendarDate} events={events} />
                </div>
            </div>
        </>
    )
}

export default App;

export const isSameDate = (o1: Date, o2: Date): boolean => {
    return o1.getFullYear() === o2.getFullYear() && o1.getMonth() === o2.getMonth() && o1.getDate() === o2.getDate();
}
