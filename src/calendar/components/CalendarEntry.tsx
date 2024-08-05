import {CalendarEvent} from "../../businesslogic/types.ts";

const ENTRY_HEIGHT = 80.5;    // Height of a single horizontal "entry" in the calendar
const PX_PER_MINUTE = (ENTRY_HEIGHT / 60);

interface CalendarEntryProp {
    event: CalendarEvent;
}

const CalendarEntry = (props: CalendarEntryProp) => {
    const dayStartDate = new Date(props.event.start);
    dayStartDate.setHours(0, 0, 0, 0);
    const pxHeight = ((props.event.end.getTime() - props.event.start.getTime()) / 60_000) * PX_PER_MINUTE;
    const startHeight = ((props.event.start.getTime() - dayStartDate.getTime()) / 60_000) * PX_PER_MINUTE;

    return (
        <>
            <div id={`event-${props.event.id}`}
                 className="w-full flex flex-col pl-2 absolute"
                 style={{
                     height: `${pxHeight}px`,
                     marginTop: `${startHeight}px`,
                     backgroundColor: `#${intToRGB(hashStr(xorshift32amx(props.event.id).toString()))}` // oshea-02.08.2024: For that spicy random stuff
                 }}>
                    <span className="text-xl truncate"> {props.event.title} </span>
                    <span> {calcTime(props.event.start)} - {calcTime(props.event.end)} </span>
                    {
                        (props.event.location) ? <span> {props.event.location} </span> : <> </>
                    }
            </div>
        </>
    );
}

function calcTime(date: Date): string {
    const h: string = date.getHours().toString();
    const m: string = date.getMinutes().toString();
    return ("00".substring(0, 2 - h.length) + h) + ":" + ("00".substring(0, 2 - m.length) + m);
}

function intToRGB(hash: number) {
    const c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

// Was too lazy to implement the hasing myself
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hashStr(str: string): number {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

// https://github.com/bryc/code/blob/master/jshash/PRNGs.md
function xorshift32amx(a: number): number {
    let t = Math.imul(a, 1597334677);
    t = t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | t << 24; // reverse byte order
    a ^= a << 13;
    a ^= a >>> 17;
    a ^= a << 5;
    return (a + t >>> 0) / 4294967296;
}

export default CalendarEntry;