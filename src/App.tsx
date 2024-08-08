import './App.css'
import Header from "./header/components/Header.tsx";
import {FormEvent, useEffect, useState} from "react";
import {createEvent, retrieveAllEvents, updateEvent} from "./businesslogic/CalendarAPI.ts";
import {CalendarEvent, mapToEvent} from "./businesslogic/types.ts";
import Sidebar from "./sidebar/components/Sidebar.tsx";
import Calendar from "./calendar/components/Calendar.tsx";
import EventModal from "./sidebar/components/EventModal.tsx";
import EventRequestBuilder from "./businesslogic/EventRequestBuilder.ts";

function App() {
    const [calendarDate, setCalendarDate] = useState(new Date()) // State for the main calendar showing the weekly view
    const [sideBarCalendarDate, setSideBarCalendarDate] = useState(new Date()) // State for the sidebar calendar showing the monthly view

    // State for the events
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    // Fetch events on initial load
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

    //TODO: remoe. this is simulating a click on an edit button of an event
    // maybe needs to be changed from selectedEvent state to something else idk yet
    useEffect(() => {
        if(loading) return;
        setSelectedEvent(events[12]);
        console.log(events[12])
    }, [events]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Modal Form submit
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)

        const builder = new EventRequestBuilder()
            .setTitle(data.get('title') as string)
            .setStart(new Date((data.get('start') as string + 'T' + (data.get('startTime') ? data.get('startTime').toString() : '00:00'))))
            .setEnd(new Date((data.get('end') as string + 'T' + (data.get('endTime') ? data.get('endTime').toString() : '23:59'))))
            .setAllday(data.get('allday') === 'true')
            .setOrganizer(data.get('organizer') as string)
            .setStatus(data.get('status') as "Free" | "Busy" | "Tentative")
            .setWebpage(data.get('webpage') as string)
            .setLocation(data.get('location') as string)
            .setImagedata(data.get('imageData') as string)
        //TODO Category missing

        // Send create or update request (POST / PUT)
        if (data.get('id')){
            updateEvent(parseInt(data.get('id') as string), builder.build()).then((res) => {
                setEvents(events.map((e) => e.id === res.id ? mapToEvent(res) : e));
                console.log("Updated event", res);
            });
        } else {
            createEvent(builder.build()).then((res) => {setEvents([...events, mapToEvent(res)])});
        }
        closeModal();
    };

    const handleEntryClick = (event: CalendarEvent) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="flex flex-col h-svh">
                <Header/>

                <div className="flex flex-row w-screen overflow-auto">
                    <div className="flex-col basis-32 shrink-0 px-2">
                        <Sidebar
                            sidebar={{
                                displayDate: sideBarCalendarDate,
                                selectedDate: calendarDate,
                                onDisplayDateChange: setSideBarCalendarDate,
                                onDateSelected: setCalendarDate,
                                events: events,
                            }}
                            onClickCreateEntry={openModal}
                        />
                    </div>
                    <Calendar selectedDate={calendarDate} events={events} onEntryClickEvent={handleEntryClick} />
                </div>
            </div>
            {isModalOpen && <EventModal event={selectedEvent} onClose={closeModal} onSubmit={handleFormSubmit}/>}
        </>
    )
}

export default App;
