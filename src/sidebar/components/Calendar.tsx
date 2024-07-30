import '../styling/Calendar.css';

const DAY_OF_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTH_OF_YEAR = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function SidebarCalendar() {
    const todaysDate = new Date();
    const displayDate = new Date(2024, 6, 1);

    // oshea-30.07.2024: Mucho scuffo
    // oshea-30.07.2024
    // Todo:
    //  CHANGE THIS!!!!!!!!!!!!
    const days = calcDisplayDaysInMonth(displayDate.getFullYear(), displayDate.getMonth());
    const htmlDays = [];
    for (let i = 0; i < days.daysInPreviousMonth; i++) { htmlDays.push(NonDay(days.days[i])); }
    for (let i = 0; i < days.daysInCurrentMonth; i++) {
        const date = days.days[days.daysInPreviousMonth + i];
        if (isSameDate(todaysDate, new Date(displayDate.getFullYear(), displayDate.getMonth(), date)))  htmlDays.push(TodayDay());
        else                                                                                            htmlDays.push(CurrDay(date));
    }
    for (let i = 0; i < days.daysInNextMonth; i++) { htmlDays.push(NonDay(days.days[days.daysInPreviousMonth + days.daysInCurrentMonth + i])); }

    // Component
    return (
        <>
            <div id="sidebar_calendar" className="h-96 w-80">
                {/* Header thingy */}
                <div className="flex text-xl text-neutral-800">
                    <span className="ml-2"> {MONTH_OF_YEAR[displayDate.getMonth()]} {displayDate.getFullYear()} </span>
                    <button id="previous_month" className="ml-auto mr-2"> &lt; </button>
                    <button id="next_month" className="ml-1 mr-2"> &gt; </button>
                </div>

                {/* Days of the week */}
                <div className="mt-1 w-full">
                    <div className="grid grid-cols-7 w-full px-2 border-b-2 text-center border-gray-400">
                        {DAY_OF_WEEK.map(day => <span> {day} </span>)}
                    </div>
                </div>

                {/* Days of month */}
                <div className="grid grid-cols-7 auto-rows-auto mt-1 w-full px-2 text-center align-middle">
                    {htmlDays}
                </div>
            </div>
        </>
    );
}

function CurrDay(date: number) {
    return (
        <>
            <span className="calendar_day text-black"> {date} </span>
        </>
    );
}

function NonDay(date: number) {
    return (
        <>
            <span className="calendar_day text-gray-500"> {date} </span>
        </>
    );
}

function TodayDay() {
    return (
        <>
            <div>
                <div className="w-full aspect-square rounded-full bg-blue-400">
                    <span className="calendar_day text-black"> {new Date().getDate()} </span>
                </div>
            </div>
        </>
    );
}

// oshea-30.07.2024: This is going to be a pain, I already know it (18:20)
// oshea-30.07.2024: Was actually pretty ok, did some scuffed things, but meh (19:00)
function calcDisplayDaysInMonth(year: number, month: number) {
    // This... this is bs
    const daysInDisplayMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    const startDayOfMonth = new Date(year, month, 1).getDay(); // WHY DO YOU START WITH SUNDAY, REEEEEE
    const endDayOfMonth = new Date(year, month, daysInDisplayMonth).getDay();

    const daysLeftInPrevMonth = (startDayOfMonth === 0) ? 6 : startDayOfMonth - 1;
    const daysLeftInNextMonth = (endDayOfMonth === 0) ? 0 : 7 - endDayOfMonth;

    const days = [];
    // Add days of previous month
    for (let i = daysLeftInPrevMonth; i > 0; i--) { days.push(daysInPreviousMonth - i + 1); }
    for (let i = 1; i <= daysInDisplayMonth; i++) { days.push(i); }
    for (let i = 1; i <= daysLeftInNextMonth; i++) { days.push(i); }

    return {
        daysInCurrentMonth: daysInDisplayMonth,
        daysInPreviousMonth: daysLeftInPrevMonth,
        daysInNextMonth: daysLeftInNextMonth,
        days: days
    };
}


/**
 * Doesn't compare the actual time!
 */
function isSameDate(o1: Date, o2: Date): boolean {
    return o1.getFullYear() === o2.getFullYear() && o1.getMonth() === o2.getMonth() && o1.getDate() === o2.getDate();
}