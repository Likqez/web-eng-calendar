// Because working with Dates is such a massive pain

/**
 * @param o1 Date object
 * @param o2 Date object
 * @returns 0 if they are equal, 1 if o1 is later than o2, else -1
 */
export const compareDatesWithTime = (o1: Date, o2: Date): number => {
    if (o1.getTime() == o2.getTime())   return 0;
    if (o1.getTime() > o2.getTime())    return 1;
    return -1;
}

/**
 * Ignores time
 * @param o1 Date object
 * @param o2 Date object
 * @returns 0 if they are equal, 1 if o1 is later than o2, else -1
 */
export const compareDates = (o1: Date, o2: Date): number => {
    const nto1 = new Date(o1), nto2 = new Date(o2);
    nto1.setHours(0, 0, 0, 0);
    nto2.setHours(0, 0, 0, 0);
    return compareDatesWithTime(nto1, nto2);
}

/**
 * Ignores time
 * @param o1 Date object
 * @param o2 Date Object
 * @returns True, if the dates are the same
 */
export const isSameDate = (o1: Date, o2: Date): boolean => {
    return compareDates(o1, o2) === 0;
}

/**
 * @param start Start date
 * @param end   End date
 * @returns A list of dates between "start" and "end"
 */
export const calcDatesFromTo = (start: Date, end: Date): Date[] => {
    if (compareDates(start, end) === 1) throw new Error("The end date is eralier than the start date!");

    const dates: [Date] = [ start ];
    for (let i = 1;; i++) {
        const newDate = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
        if (compareDates(newDate, end)) break;
        dates.push(newDate);
    }

    return dates;
}

/**
 * Ignores time
 * @param date Date to be converted
 * @returns An integer representing this date
 */
export const calcDateIndex = (date: Date): number => {
    // yyyyMMdd as a num
    const yearStr = date.getFullYear().toString();
    const monthStr = "00".substring(0, 2 - date.getMonth().toString().length) + date.getMonth().toString();
    const dateStr = "00".substring(0, 2 - date.getDate().toString().length) + date.getDate().toString();

    return Number.parseInt(yearStr + monthStr + dateStr);
}

/**
 * @param date Date time to format
 * @returns A formatted string of the time: "hh:mm"
 */
export const getTimeFormatted = (date: Date): string => {
    const h: string = date.getHours().toString();
    const m: string = date.getMinutes().toString();
    return ("00".substring(0, 2 - h.length) + h) + ":" + ("00".substring(0, 2 - m.length) + m);
}

/**
 * @param date Date to format
 * @returns A formatted string of the date: "yyyy-MM-dd" 
 */
export const getDateFormatted = (date: Date): string => {
    const y: string = date.getFullYear().toString();
    const m: string = date.getMonth().toString();
    const d: string = date.getDate().toString();
    return ("0000".substring(0, 4 - y.length) + y) + "-" + ("00".substring(0, 2 - m.length) + m) + "-" + ("00".substring(0, 2 - d.length) + d);
}