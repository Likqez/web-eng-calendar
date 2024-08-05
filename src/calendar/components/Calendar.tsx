import '../styling/Calendar.css'
import {CalendarEvent} from "../../businesslogic/types.ts";
import CalendarHeader from './CalendarHeader.tsx';
import CalendarBody from './CalendarBody.tsx';

interface CalendarProps {
    events: CalendarEvent[];
    selectedDate: Date,
    // onClickCreateEntry: () => void // Was also for additional create button
}

const Calendar = (props: CalendarProps) => {
    const weekDates: Date[] = calcWeekDates(props.selectedDate);

    return (
        <>
            <div id="calendar" className="flex flex-col w-full pt-2 overflow-hidden">
                <CalendarHeader weekDates={weekDates} selectedDate={props.selectedDate} />
                <div className="overflow-y-scroll scrollbar-hide mb-6">
                    <CalendarBody weekDates={weekDates} events={props.events} />
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