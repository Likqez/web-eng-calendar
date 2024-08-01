//Component that displays a single date entry in the sidebar calendar
// replacement to the functions NonDay/CurrDay/TodayDay
// can contain props for the date to save it and access when clicked.

import {FC} from "react";

interface SidebarCalendarEntryProps {
    onClick: () => void
    displayDate: Date
    selectedDate: Date
    date: Date
}

const SidebarCalendarEntry: FC<SidebarCalendarEntryProps> = (props) => {
    const {date, displayDate, selectedDate, onClick} = props;

    const isCurrentMonth = date.getMonth() === displayDate.getMonth();
    const isToday = isSameDate(date, new Date());
    const isSelected = isSameDate(selectedDate, date);

    return (
        <>
            <button onClick={onClick}>
                <div className={`rounded-full hover:bg-blue-100 
                ${isSelected ? "bg-blue-300 hover:bg-blue-400" : ""}
                ${isToday ? "bg-blue-500 hover:bg-blue-600" : ""}
                `}>

                    <div className={`calendar_day 
                    ${isCurrentMonth ? "text-black" : "text-gray-500"} 
                    ${isSelected ? "text-blue-700" : ""}
                    ${isToday ? "text-white" : ""}
                    `}>
                        {date.getDate()}
                    </div>
                </div>

            </button>
        </>
    );
}

function isSameDate(o1: Date, o2: Date): boolean {
    return o1.getFullYear() === o2.getFullYear() && o1.getMonth() === o2.getMonth() && o1.getDate() === o2.getDate();
}

export default SidebarCalendarEntry;