
const CalendarSidebar = () => {
    return (
        <>
            <div id="calendar_sidebar" className="grid grid-rows-24 w-12 pl-6 pt-2">
                {
                    Array.from(Array(24).keys())
                        .map((hour) =>
                            <span className="h-20 inline-block align-text-bottom text-sm">
                                {calcTime(hour)}    
                            </span>
                        )
                }
            </div>
        </>
    )
}

export default CalendarSidebar;

function calcTime(hour: number): string {
    if (hour === 0) return "";  // Nicer than "0 AM"

    const suffix = (hour < 12) ? "AM" : "PM";
    const num = (hour <= 12) ? hour : (hour % 12);  // Have to consider the skip from 12 to 1
    return num.toString().concat(suffix);
} 