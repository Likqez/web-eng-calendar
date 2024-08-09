import { CalendarEvent } from "../../businesslogic/types";
import { calcDatesFromTo, compareDates } from "../../businesslogic/util/DateUtil";

export type EntryInfo = {
    start: Date;
    end: Date;
    event: CalendarEvent;
    isMain: boolean;        // Indicates if this entry is only due to an event spanning multiple days. I.e. an event spanning two days should only have text on the first day, but not the second
}

export const calcEntriesForWeek = (events: CalendarEvent[], weekDates: Date[]): EntryInfo[][] => {
    const infos: EntryInfo[][] = [];
    for (let i = 0; i < 7; i++) { infos.push([]); }

    const seen = [];
    const weekEvents = filterEventsOfWeek(weekDates, events);
    console.log(weekEvents)

    for (let wE of weekEvents) {
        const days: {allDay: boolean, start: Date, end: Date, event: CalendarEvent}[] = mapEventToWeekDays(wE, weekDates);
        
        for (let day of days) {
            const d = day.start.getDay();
            const index = (d === 0) ? 6 : d - 1;

            if (day.allDay) {
                day.start.setHours(0, 0);
                day.end.setHours(23, 59);
            }

            if (Number.isNaN(index)) {
                console.log(wE.title, wE.start.getTime(), d, day.start.getTime());
            }

            infos[index].push({event: day.event, start: day.start, end: day.end, isMain: !(day.event.id in seen)});
            seen.push(day.event.id);
        }
    }

    return infos;
}

function filterEventsOfWeek(weekDates: Date[], events: CalendarEvent[]): CalendarEvent[] {
    return events.filter((e) =>{
        if (compareDates(weekDates[0], e.start) === 1) return false;
        if (compareDates(weekDates[6], e.end) === -1) return false;
        return true;
    });
}

function mapEventToWeekDays(event: CalendarEvent, weekDates: Date[]): {allDay: boolean, start: Date, end: Date, event: CalendarEvent}[] {
    const dates = calcDatesFromTo(event.start, event.end).filter(e => {
        if (compareDates(e, weekDates[0]) === -1) return false;
        if (compareDates(e, weekDates[6]) === 1) return false;
        return true;
    });

    if (dates.length === 1) return [ {allDay: false, start: event.start, end: event.end, event: event} ];
    if (event.id === 10846) {
        console.log(dates);
    }
    const newEnd = new Date(dates[0]);
    const newStart = new Date(dates[dates.length - 1]);
    newEnd.setHours(23, 59);
    newStart.setHours(0, 0);

    const result = [];
    result.push({ allDay: false, start: event.start, end: newEnd, event: event });

    for (let i = 1; i < dates.length - 1; i++) {
        result.push({ allDay: true, start: dates[i], end: dates[i], event: event });
    }

    result.push({ allDay: false, start: newStart, end: event.end, event: event });
    return result;
}