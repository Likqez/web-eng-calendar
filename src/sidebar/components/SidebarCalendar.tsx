import {IoChevronBackSharp, IoChevronForwardSharp} from "react-icons/io5";
import React, {FC} from "react";
import SidebarCalendarEntry from "./SidebarCalendarEntry.tsx";
import { CalendarEvent } from "../../businesslogic/types.ts";
import {calcDateIndex, calcDatesFromTo} from "../../businesslogic/util/DateUtil.ts";

const DAYS_OF_WEEK: DayEntry[] = [
    { short: 'M', long: "Monday" },
    { short: 'T', long: "Tuesday" },
    { short: 'W', long: "It's Wednesday my dudes" },
    { short: 'T', long: "Thursday" },
    { short: 'F', long: "Friday" },
    { short: 'S', long: "Saturday" },
    { short: 'S', long: "Sunday" }
]
const MONTH_OF_YEAR = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface DayEntry {
    short: string;
    long: string;
}

export interface SidebarCalendarProps {
    events: CalendarEvent[];
    displayDate: Date;
    onDisplayDateChange: (date: Date) => void;
    selectedDate: Date;
    onDateSelected: (date: Date) => void;
}

const SidebarCalendar: FC<SidebarCalendarProps> = (props) => {
    const displayDate = new Date(props.displayDate);

    const goToNextMonth = () => {
        displayDate.setMonth(displayDate.getMonth() + 1);
        props.onDisplayDateChange(displayDate); // Let parent component know to handle the state change
    };

    const goToPreviousMonth = () => {
        displayDate.setMonth(displayDate.getMonth() - 1);
        if (displayDate.getDate() < props.displayDate.getDate()) {
            displayDate.setDate(0); // Set to the last day of the previous month
        }
        props.onDisplayDateChange(displayDate); // Let parent component know to handle the state change
    };

    const setNewSelectedDate = (date: Date) => {
        displayDate.setDate(date.getDate());
        displayDate.setMonth(date.getMonth());
        displayDate.setFullYear(date.getFullYear());
        props.onDisplayDateChange(displayDate);
        props.onDateSelected(date);
    };

    const eventMap: { [id: number] : CalendarEvent; } = {};
    for (const event of props.events) {
        const dates = calcDatesFromTo(event.start, event.end);
        dates.forEach(d => eventMap[calcDateIndex(d)] = event)
    }
    props.events

    // Component
    return (
        <>
            <div id="sidebar_calendar" className="w-full">
                {/* Header thingy */}
                <div className="flex text-lg text-neutral-800 text-nowrap">
                    <span className="ml-2"> {MONTH_OF_YEAR[displayDate.getMonth()]} {displayDate.getFullYear()} </span>
                    <button id="previous_month" className="ml-auto mr-2 has-tooltip" onClick={goToPreviousMonth}>
                        <IoChevronBackSharp/>
                        <span className='tooltip'>Prev. month</span>

                    </button>
                    <button id="next_month" className="ml-1 mr-2 has-tooltip" onClick={goToNextMonth}>
                        <IoChevronForwardSharp/>
                        <span className='tooltip'>Next month</span>
                    </button>
                </div>

                {/* Days of the week */}
                <div className="mt-1 w-full">
                    <div className="grid grid-cols-7 w-full px-2 border-b-2 text-center border-gray-400">
                        {
                            DAYS_OF_WEEK
                                .map((entry) =>
                                    <React.Fragment key={`sidebar_header_${DAYS_OF_WEEK.findIndex((e) => e.long == entry.long)}`}>
                                        <span className="has-tooltip"> {entry.short}
                                            <span className="tooltip"> {entry.long} </span>
                                        </span>
                                    </React.Fragment>
                                )
                        }
                    </div>
                </div>

                {/* Days of month */}
                <div className="grid grid-cols-7 auto-rows-auto mt-1 w-full px-2 text-center align-middle">
                    {
                        calcDisplayDaysInMonth(displayDate.getFullYear(), displayDate.getMonth())
                            .map((d) => SidebarCalendarEntry({
                                displayDate: displayDate,
                                date: d,
                                selectedDate: props.selectedDate,
                                onClick: () => {setNewSelectedDate(d)},
                                eventMap: eventMap
                            }))
                    }
                </div>
            </div>
        </>
    );
}

export default SidebarCalendar;

// oshea-30.07.2024: This is going to be a pain, I already know it (18:20)
// oshea-30.07.2024: Was actually pretty ok, did some scuffed things, but meh (19:00)
// oshea-02.08.2024: You can make this way better, maybe "later"
function calcDisplayDaysInMonth(year: number, month: number) {
    // This... this is bs
    const endOfDisplayMonth = new Date(year, month + 1, 0);
    const endOfPreviousMonth = new Date(year, month, 0);
    const endOfNextMonth = new Date(year, month + 2, 0);

    const daysInDisplayMonth = endOfDisplayMonth.getDate();
    const daysInPreviousMonth = endOfPreviousMonth.getDate();

    const yearOfPreviousMonth = endOfPreviousMonth.getFullYear();
    const yearOfNextMonth = endOfNextMonth.getFullYear();

    const previousMonth = endOfPreviousMonth.getMonth();
    const nextMonth = endOfNextMonth.getMonth();

    const startDayOfMonth = new Date(year, month, 1).getDay(); // WHY DO YOU START WITH SUNDAY, REEEEEE
    const endDayOfMonth = new Date(year, month, daysInDisplayMonth).getDay();

    const daysLeftInPrevMonth = (startDayOfMonth === 0) ? 6 : startDayOfMonth - 1;
    const daysLeftInNextMonth = (endDayOfMonth === 0) ? 0 : 7 - endDayOfMonth;

    const dates = [];
    // Add days of previous month
    for (let i = daysLeftInPrevMonth; i > 0; i--) {
        dates.push(new Date(yearOfPreviousMonth, previousMonth, daysInPreviousMonth - i + 1));
    }
    for (let i = 1; i <= daysInDisplayMonth; i++) {
        dates.push(new Date(year, month, i));
    }
    for (let i = 1; i <= daysLeftInNextMonth; i++) {
        dates.push(new Date(yearOfNextMonth, nextMonth, i));
    }

    return dates;
}