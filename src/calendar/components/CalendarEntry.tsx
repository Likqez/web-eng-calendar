import {CalendarEvent} from "../../businesslogic/types.ts";
import {generateUniqueHexColor} from "../../businesslogic/util/ColorGenerationUtil.ts";

const ENTRY_HEIGHT = 80.5;    // Height of a single horizontal "entry" in the calendar
const PX_PER_MINUTE = (ENTRY_HEIGHT / 60);

interface CalendarEntryProp {
    event: CalendarEvent;
    onClick: (event: CalendarEvent) => void;
}

const CalendarEntry = (props: CalendarEntryProp) => {
    const dayStartDate = new Date(props.event.start);
    dayStartDate.setHours(0, 0, 0, 0);
    const pxHeight = ((props.event.end.getTime() - props.event.start.getTime()) / 60_000) * PX_PER_MINUTE;
    const startHeight = ((props.event.start.getTime() - dayStartDate.getTime()) / 60_000) * PX_PER_MINUTE;

    return (
        <>
            <button
                id={`event-${props.event.id}`}
                onClick={() => props.onClick(props.event)}
                className="w-full flex flex-col pl-2 absolute rounded-lg"
                style={{
                     height: `${pxHeight}px`,
                     marginTop: `${startHeight}px`,
                     backgroundColor: `${generateUniqueHexColor(props.event.id)}` // oshea-02.08.2024: For that spicy random stuff
                 }}>
                    <span className="line-clamp-1 text-xl">
                        {props.event.title}
                    </span>
                    <span className="line-clamp-1">
                        {calcTime(props.event.start)} - {calcTime(props.event.end)}
                    </span>
                    {
                        (props.event.location) ? <span className="line-clamp-1"> {props.event.location} </span> : <> </>
                    }
            </button>
        </>
    );
}

function calcTime(date: Date): string {
    const h: string = date.getHours().toString();
    const m: string = date.getMinutes().toString();
    return ("00".substring(0, 2 - h.length) + h) + ":" + ("00".substring(0, 2 - m.length) + m);
}

export default CalendarEntry;