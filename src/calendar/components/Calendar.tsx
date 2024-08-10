import '../styling/Calendar.css'
import {CalendarEvent} from "../../businesslogic/types.ts";
import CalendarHeader from './CalendarHeader.tsx';
import CalendarBody from './CalendarBody.tsx';
import {useEffect, useRef} from "react";
import {ENTRY_HEIGHT} from "./CalendarVisualGrid.tsx";
import {calcWeekDates} from "../../businesslogic/util/DateUtil.ts";

interface CalendarProps {
    events: CalendarEvent[];
    selectedDate: Date;
    onEntryClickEvent: (event: CalendarEvent) => void;
    onOverlayDoubleClick: (date: Date) => void;
    // onClickCreateEntry: () => void // Was also for additional create button
}

const Calendar = (props: CalendarProps) => {
    const weekDates: Date[] = calcWeekDates(props.selectedDate);
    const calendarBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (calendarBodyRef.current) {
            calendarBodyRef.current.scrollTo({
                top: calendarBodyRef.current.scrollHeight - (ENTRY_HEIGHT * (25 - new Date().getHours())),
                behavior: "smooth"
            });
        }
    }, []);


    return (
        <>
            <div id="calendar" className="flex flex-col w-full pt-2 overflow-hidden">
                <CalendarHeader weekDates={weekDates} selectedDate={props.selectedDate} />
                <div ref={calendarBodyRef} className="overflow-y-scroll scrollbar-hide pb-6">
                    <CalendarBody
                            weekDates={weekDates} 
                            events={props.events}
                            onEntryClick={props.onEntryClickEvent}
                            onOverlayDoubleClick={props.onOverlayDoubleClick} />
                </div>
            </div>
        </>
    );
}

export default Calendar;