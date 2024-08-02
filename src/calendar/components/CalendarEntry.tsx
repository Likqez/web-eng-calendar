import {CalendarEvent} from "../../businesslogic/types.ts";

interface CalendarEntryProp {
    event: CalendarEvent;
}

const CalendarEntry = (props: CalendarEntryProp) => {
    const pxPerMin = /* document.getElementById("calendar_horizontal").children[0].clientHeight / 60; */ 1;
    const pxHeight = ((props.event.end.getTime() - props.event.start.getTime()) / 60000) * pxPerMin;
    console.log(((props.event.end.getTime() - props.event.start.getTime()) / 60000) + " mins");
    console.log(pxPerMin);
    console.log(pxHeight);

    return (
        <>
            <div id={"event-" + props.event.id} className={"bg-blue-400 w-full h-10"}>

            </div>
        </>
    );
}

export default CalendarEntry;