import {CalendarEvent, Category} from "../../businesslogic/types.ts";
import {generateUniqueHexColor} from "../../businesslogic/util/ColorGenerationUtil.ts";
import { getTimeFormatted } from "../../businesslogic/util/DateUtil.ts";

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
                     backgroundColor: generateUniqueHexColor(props.event.id)
                 }}>
                    <span className="line-clamp-1 text-xl">
                        {props.event.title}
                    </span>
                    <span className="line-clamp-1">
                        {getTimeFormatted(props.event.start)} - {getTimeFormatted(props.event.end)}
                    </span>
                    {
                        (props.event.location) ? <span className="line-clamp-1"> {props.event.location} </span> : <> </>
                    }
            </button>
        </>
    );
}

interface CatData {
    cats: Category[];
}

const CategoryIndicator = (props: CatData) => {
    if (!props.cats) return <></>

    const wP = 100 / props.cats.length;
    const colorStr = Array.from(Array(props.cats.length).keys()).map((i) => `${generateUniqueHexColor(props.cats[i].id)} ${i * wP}% ${(i + 1) * wP}%`).join(", ");

    return (
        <>
            <div className="w-2 h-full" style={
                { background: `linear-gradient(to bottom, ${colorStr})` }
            }>
            </div>
        </>
    );
}

function calcMinutesFromDate(date: Date) {
    return date.getHours() * 60 + date.getMinutes();
}

export default CalendarEntry;