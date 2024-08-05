import { CalendarEvent } from "../../businesslogic/types"
import CalendarEventOverlay from "./CalendarEventOverlay";
import CalendarSidebar from "./CalendarSidebar";
import CalendarVisualGrid from "./CalendarVisualGrid"

export interface BodyProp {
    weekDates: Date[];
    events: CalendarEvent[];
}

const CalendarBody = (props: BodyProp) => {
    return (
        <>
            <div id="calendar_body" className="flex flex-row">
                <CalendarSidebar />
                <div className="relative mx-2 pt-2 w-full">
                    <CalendarVisualGrid />
                    <CalendarEventOverlay events={props.events} weekDates={props.weekDates} />
                </div>
            </div>
        </>
    )
}

export default CalendarBody;