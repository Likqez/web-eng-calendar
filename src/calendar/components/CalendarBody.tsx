import { MouseEvent } from "react";
import { CalendarEvent } from "../../businesslogic/types"
import CalendarEventOverlay from "./CalendarEventOverlay";
import CalendarSidebar from "./CalendarSidebar";
import CalendarVisualGrid from "./CalendarVisualGrid"

export interface BodyProp {
    weekDates: Date[];
    events: CalendarEvent[];
    onEntryClick: (event: CalendarEvent) => void;
    onOverlayDoubleClick: (date: Date) => void;
}

const CalendarBody = (props: BodyProp) => {
    const approximateDate = (event: MouseEvent): Date => {
        const rect = document.getElementById("calendar_body").getBoundingClientRect();
        const relX = event.pageX - rect.x, relY = event.pageY - rect.y;
        const pX = relX / rect.width, pY = relY / rect.height;      // Values from 0 - 1 relative to where the user cicked on the body

        let day;
        for (let i = 0; i < 7; i++) {
            day = i;
            if ((i / 7) < pX && pX < ((i + 1) / 7)) break;
        }

        let halfHour;
        for (let i = 0; i < 48; i++) {
            halfHour = i;
            if ((i / 48) < pY && pY < ((i + 1) / 48)) break;
        }

        const date = new Date(props.weekDates[day]);
        date.setHours(Math.floor(halfHour / 2), (halfHour % 2) * 30);
        return date;
    }

    return (
        <>
            <div className="flex flex-row">
                <CalendarSidebar />
                <div id="calendar_body" className="relative mx-2 pt-2 w-full" onDoubleClick={(e) => props.onOverlayDoubleClick(approximateDate(e))}>
                    <CalendarVisualGrid />
                    <CalendarEventOverlay events={props.events} weekDates={props.weekDates} onEntryClick={props.onEntryClick} />
                </div>
            </div>
        </>
    )
}

export default CalendarBody;