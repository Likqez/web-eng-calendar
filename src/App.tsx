import './App.css';
import Quack from "../public/Duck Quack - Sound Effect (HD).mp3";
import Header from "./header/components/Header.tsx";
import {FormEvent, useEffect, useState} from "react";
import {createEvent, retrieveAllEvents, updateEvent} from "./businesslogic/CalendarAPI.ts";
import {CalendarEvent, mapToEvent} from "./businesslogic/types.ts";
import Sidebar from "./sidebar/components/Sidebar.tsx";
import Calendar from "./calendar/components/Calendar.tsx";
import EventModal from "./sidebar/components/EventModal.tsx";
import EventRequestBuilder from "./businesslogic/EventRequestBuilder.ts";
import Funny from './funnies/component/Funnies.tsx';

function App() {
    const [calendarDate, setCalendarDate] = useState(new Date()) // State for the main calendar showing the weekly view
    const [sideBarCalendarDate, setSideBarCalendarDate] = useState(new Date()) // State for the sidebar calendar showing the monthly view

    // State for the events
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    // Funnies :)
    const [funnyCounter, setFunnyCounter] = useState<number>(0);
    const colors = ["#ff0000", "#33FF57", "#e033ff", "#F3FF33", "#FF33F3"];
    const [colorIndex, setColorIndex] = useState(0);

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

    // Interval for funnies
    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 3000); // Change color every 3 seconds

        return () => clearInterval(interval);
    }, [colors.length]);


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
            .setAllday(Boolean(data.get('allday') as string))
            .setOrganizer(data.get('organizer') as string)
            .setStatus(data.get('status') as "Free" | "Busy" | "Tentative")
            .setWebpage(data.get('webpage') as string)
            .setLocation(data.get('location') as string)
            .setImagedata(data.get('imageData') as string)

        //TODO Category missing

        if (data.get('imageData') === '') builder.setImagedata(null);

        // Send create or update request (POST / PUT)
        if (data.get('id')) {
            updateEvent(parseInt(data.get('id') as string), builder.build()).then((res) => {
                setEvents(events.map((e) => e.id === res.id ? mapToEvent(res) : e));
                console.log("Updated event", res);
            });
        } else {
            createEvent(builder.build()).then((res) => {
                setEvents([...events, mapToEvent(res)])
            });
        }
        closeModal();
    };

    const handleTogglingFunny = () => {
        new Audio(Quack).play();
        setFunnyCounter(funnyCounter + 1);
    }

    const handleEntryClick = (event: CalendarEvent) => {
        console.log(events);
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleCreateViaOverlay = (date: Date) => {
        setSelectedEvent({
            title: null,
            location: null,
            organizer: null,
            start: date,
            end: new Date(date.getTime() + 30 * 60_000),    // Adding 30 mins
            allday: false,
            webpage: null,
            imageurl: null,
            categories: null,
            status: null,
            id: null
        });
        setIsModalOpen(true);
    }

    return (
        <>
            {
                (funnyCounter >= 5) ? 
                <Funny /> :
                <> {/* https://imgflip.com/i/8zmky9 */ } </>
            }
            <div id="funny-bg-container" className="flex flex-col h-svh" style={{ backgroundColor: funnyCounter >= 5 ? colors[colorIndex] : '' }}>
                <Header onProfileClick={handleTogglingFunny}/>

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
                            onClickCreateEntry={() => {
                                setSelectedEvent(null);
                                openModal();
                            }}
                        />
                    </div>
                    <Calendar
                        selectedDate={calendarDate}
                        events={events}
                        onEntryClickEvent={handleEntryClick}
                        onOverlayDoubleClick={(d) => handleCreateViaOverlay(d)}/>
                </div>
            </div>
            {isModalOpen && <EventModal event={selectedEvent} onClose={closeModal} onSubmit={handleFormSubmit}/>}
        </>
    )
}

export default App;
