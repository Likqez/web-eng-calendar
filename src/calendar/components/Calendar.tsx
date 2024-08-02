import '../styling/Calendar.css'
import {CalendarEvent} from "../../businesslogic/types.ts";
import CalendarEntry from "./CalendarEntry.tsx";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface CalendarProps {
    events: CalendarEvent[];
    selectedDate: Date
}

const Calendar = (props: CalendarProps) => {
    const weekDates: Date[] = calcWeekDates(props.selectedDate);
    console.log(filterEventsOfWeek(weekDates[3], props.events));

    return (
        <>
            <div id="calendar" className="w-full pt-2">
                <div id="calendar_header" className="calendar_grid z-10">
                    {/* Empty entry for the first grid entry */}
                    <div></div>

                    {/* Days and Dates header */}
                    <div className="grid grid-rows-2 h-fit border-b border-gray-400 pb-1 mx-2">
                        <div className="grid grid-cols-7 w-full px-2 pt-3 text-center">
                            {DAYS.map((day) => <span> {day} </span>)}
                        </div>
                        <div className="grid grid-cols-7 w-full px-2 pt-3 text-center">
                            {
                                weekDates.map((day) =>
                                    <span className="text-2xl"> {day.getDate()} </span>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div id="calendar_body" className="calendar_grid overflow-y-scroll">
                    {/* Times */}
                    <div className="grid grid-rows-24 pl-2 pt-2">
                        {
                            Array.from(Array(24).keys())
                                .map((hour) =>
                                        <span className="h-20 inline-block align-text-bottom">
                                    {(hour === 0) ?
                                        "" :
                                        ((hour < 12) ? (hour % 12) + " AM" : ((hour === 12) ? 12 : (hour % 12)) + " PM")    // oshea-02.08.2024: WHY IS 12PM A THING, AAAAAAAHHHHHHHHHHHHHHH
                                    }
                                </span>
                                )
                        }
                    </div>

                    {/* Event stuff */}
                    <div id="calendar_grid" className="relative pt-5 mx-2">
                        {/* Horizontal lines */}
                        <div id="calendar_horizontal" className="grid grid-rows-24 absolute h-full w-full px-2">
                            {
                                Array.from(Array(24).keys())
                                    .map(_ =>
                                        <div className="h-full w-full border-y-[1px] border-black"></div>
                                    )
                            }
                        </div>

                        {/* Vertical lines */}
                        <div id="calendar_vertical" className="grid grid-cols-7 h-full w-full absolute px-2">
                            {
                                Array.from(Array(7).keys())
                                    .map(_ =>
                                        <div className="h-full w-full border-x-[1px] border-black"> </div>
                                    )
                            }
                        </div>

                        {/* Actual Events */}
                        <div id="calendar_events" className="grid grid-cols-7 h-full w-full absolute px-2">
                            {
                                filterEventsOfWeek(weekDates[3], props.events)
                                    .map(event => {
                                        if (event === null) return <div></div>;
                                        else return <CalendarEntry event={event}/>
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calendar;

function calcWeekDates(selectedDate: Date): Date[] {
    const day = selectedDate.getDay();

    const date = selectedDate.getDate();
    const weekStartDate = date - ((day == 0) ? 6 : day - 1)
    const dates = [];
    for (let i = 0; i < 7; i++) {
        dates.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), weekStartDate + i));

    }
    return dates;

}

function filterEventsOfWeek(middleDateOfWeek: Date, events: CalendarEvent[]): CalendarEvent[] {
    // oshea-02.08.2024: This is so cursed...
    // The idea is to take the difference between the middle of the week and the start of the event.
    // If the difference is small enough, it must be in the same week

    const filtered = Array(7).fill(null);
    events.filter((event) => {
        return true;
    }).forEach((event) => {
        const day = event.start.getDay();
        const index = (day === 0) ? 6 : day - 1;
        filtered[index] = event;
    });

    // const time = Math.abs(middleDateOfWeek.getTime() - event.start.getTime());
    // const deltaDate = new Date(time).getDate();
    // return (deltaDate == 5);    // oshea-02.08.2024: Why 5? idk
    return filtered;
}