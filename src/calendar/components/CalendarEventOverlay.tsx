import { CalendarEvent } from "../../businesslogic/types";
import { BodyProp } from "./CalendarBody";
import CalendarEntry from "./CalendarEntry";

const CalendarEventOverlay = (props: BodyProp) => {
    return (
        <>
            <div id="event_overlay" className="w-full h-full grid grid-cols-7 px-2">
                {
                    filterEventsOfWeek(props.weekDates[3], props.events)
                        .map(dayEvents =>
                            <SingleEvent dayEvents={dayEvents}  />
                        )
                }
            </div>
        </>
    )
}

export default CalendarEventOverlay;

interface SingleEventProp {
    dayEvents: CalendarEvent[];
}

const SingleEvent = (props: SingleEventProp) => {
    return (
        <>
            <div className="flex flex-col w-full h-full relative">
                {
                    props.dayEvents.map((event) =>
                        <CalendarEntry event={event} />
                    )
                }
            </div>
        </>
    );
}

function filterEventsOfWeek(middleOfWeek: Date, events: CalendarEvent[]): CalendarEvent[][] {
    // oshea-02.08.2024: This is so cursed...
    // The idea is to take the difference between the middle of the week and the start of the event.
    // If the difference is small enough, it must be in the same week

    const filtered: CalendarEvent[][] = [];
    for (let i = 0; i < 7; i++) {
        filtered.push(Array(0))
    }

    events.filter((event) => {
        // oshea-02.08.2024
        // Todo:
        //  This doesn't work correctly?
        const time = Math.abs(middleOfWeek.getTime() - event.start.getTime());
        const deltaDate = new Date(time).getDate();
        return (deltaDate <= 3);
    }).forEach((event) => {
        console.log(event);
        const day = event.start.getDay();
        const index = (day === 0) ? 6 : day - 1;
        filtered[index].push(event);
    });

    // Filter the events, so they are rendered correctly later
    for (let i = 1; i < 7; i++) {
        filtered[i].sort((a, b) => {
            const aEventLength = (a.end.getTime() - a.start.getTime());
            const bEventLength = (b.end.getTime() - b.start.getTime());

            if (aEventLength < bEventLength) return 1;
            else return -1;
        });
    }

    console.log(filtered);
    return filtered;
}