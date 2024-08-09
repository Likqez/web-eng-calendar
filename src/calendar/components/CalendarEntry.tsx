import {CalendarEvent, Category} from "../../businesslogic/types.ts";
import {generateUniqueHexColor} from "../../businesslogic/util/ColorGenerationUtil.ts";
import { getTimeFormatted } from "../../businesslogic/util/DateUtil.ts";
import { EntryInfo } from "../repository/CalendarEntryOverlay.ts";

const ENTRY_HEIGHT = 80.5;    // Height of a single horizontal "entry" in the calendar
const PX_PER_MINUTE = (ENTRY_HEIGHT / 60);

interface CalendarEntryProp {
    info: EntryInfo;
    onClick: (event: CalendarEvent) => void;
}

const CalendarEntry = (props: CalendarEntryProp) => {
    const pxHeight = (calcMinutesFromDate(props.info.end) - calcMinutesFromDate(props.info.start)) * PX_PER_MINUTE;
    const startHeight = calcMinutesFromDate(props.info.start) * PX_PER_MINUTE;

    return (
        <>
            <button
                id={`event-${props.info.event.id}`}
                onClick={() => props.onClick(props.info.event)}
                className="w-11/12 flex flex-col absolute rounded-lg bg-blue-500 border-white border-2"
                style={{
                     height: `${pxHeight}px`,
                     marginTop: `${startHeight}px`
                 }}>
                    <div className="flex-col h-full absolute">
                        <CategoryIndicator cats={props.info.event.categories}/>
                    </div>
                    <div className="flex-col h-full w-full absolute pl-2 overflow-clip">
                        {
                            (!props.info.isMain) ?
                            <></> :
                            <>
                                <span className="line-clamp-1 text-xl">
                                    {props.info.event.title}
                                </span>
                                <span className="line-clamp-1">
                                    {getTimeFormatted(props.info.event.start)} - {getTimeFormatted(props.info.event.end)}
                                </span>
                                {
                                    (props.info.event.location) ? <span className="line-clamp-1"> {props.info.event.location} </span> : <> </>
                                }
                            </>
                        }
                    </div>
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