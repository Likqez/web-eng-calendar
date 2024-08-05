import '../styling/Calendar.css'
import {CalendarEvent} from "../../businesslogic/types.ts";
import CalendarHeader from './CalendarHeader.tsx';
import CalendarBody from './CalendarBody.tsx';

interface CalendarProps {
    events: CalendarEvent[];
    selectedDate: Date
}

const Calendar = (props: CalendarProps) => {
    const weekDates: Date[] = calcWeekDates(props.selectedDate);

    return (
        <>
            <div id="calendar" className="flex flex-col w-full pt-2">
                <CalendarHeader weekDates={weekDates} />
                <CalendarBody weekDates={weekDates} events={props.events} />
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