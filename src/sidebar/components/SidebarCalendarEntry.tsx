//Component that displays a single date entry in the sidebar calendar
// replacement to the functions NonDay/CurrDay/TodayDay
// can contain props for the date to save it and access when clicked.

import {FC} from "react";
import {calcDateIndex, isSameDate} from "../../businesslogic/util/DateUtil.ts";
import { CalendarEvent } from "../../businesslogic/types.ts";
import { generateCalendarEventColor, generateUniqueHexColor } from "../../businesslogic/util/ColorGenerationUtil.ts";

interface SidebarCalendarEntryProps {
    onClick: () => void;
    displayDate: Date;
    selectedDate: Date;
    date: Date;
    eventMap: { [id: number] : CalendarEvent; };    // ID is the DateUtil#calcDateIndex func (This doesn't have to be perfect. It just needs to display that there is an event)
}

const SidebarCalendarEntry: FC<SidebarCalendarEntryProps> = (props) => {
    const {date, displayDate, selectedDate, onClick} = props;

    const isCurrentMonth = date.getMonth() === displayDate.getMonth();
    const isToday = isSameDate(date, new Date());
    const isSelected = isSameDate(selectedDate, date);
    const hasEvent = (props.eventMap[calcDateIndex(date)] !== undefined);

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

                    {
                    (!hasEvent) ?
                        <></> :
                        <div className="flex w-full justify-center">
                            <div className="rounded-full h-1 w-1 bg-orange-500">
                            </div>
                        </div>
                }
                </div>

            </button>
        </>
    );
}

export default SidebarCalendarEntry;