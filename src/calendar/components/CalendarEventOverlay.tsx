import React from "react";
import { CalendarEvent } from "../../businesslogic/types";
import { calcEntriesForWeek, EntryInfo } from "../repository/CalendarEntryOverlay";
import CalendarEntry from "./CalendarEntry";

interface OverlayProps {
    weekDates: Date[];
    events: CalendarEvent[];
    onEntryClick: (event: CalendarEvent) => void;
}

const CalendarEventOverlay = (props: OverlayProps) => {
    const entries: EntryInfo[][] = calcEntriesForWeek(props.events, props.weekDates);
    // console.log(entries);

    return (
        <>
            <div id="event_overlay" className="w-full h-full grid grid-cols-7 px-2">
                {
                    Array.from(Array(7).keys()).map(k => {
                        const sorted = sortEntries(entries[k]);
                        return (
                            <React.Fragment key={`eventoverlay_${k}`}>
                                <SingleEvent dayEvents={sorted} onClick={props.onEntryClick} />
                            </React.Fragment>
                        );
                        }
                    )
                }
            </div>
        </>
    )
}

export default CalendarEventOverlay;

function sortEntries(entries: EntryInfo[]): EntryInfo[] {
    return entries.sort((o1, o2) => {
        const o1T = (o1.end.getTime() - o1.start.getTime()), o2T = (o2.end.getTime() - o2.start.getTime());
        return (o1T > o2T) ? -1 : 1;
    });
}

interface SingleEventProp {
    dayEvents: EntryInfo[];
    onClick: (event: CalendarEvent) => void;
}

const SingleEvent = (props: SingleEventProp) => {
    return (
        <>
            <div className="flex flex-col w-full h-full relative">
                {
                    props.dayEvents.map((info) =>
                        <React.Fragment key={`eventoverlay_events_${info.event.id}`}>
                            <CalendarEntry info={info} onClick={props.onClick} />
                        </React.Fragment>
                    )
                }
            </div>
        </>
    );
}