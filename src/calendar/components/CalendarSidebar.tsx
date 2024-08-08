import { getTimeFormatted } from "../../businesslogic/util/DateUtil";

const CalendarSidebar = () => {
    const d = new Date();

    return (
        <>
            <div id="calendar_sidebar" className="grid grid-rows-24 w-12 pl-6 pt-2">
                {
                    Array.from(Array(24).keys())
                        .map((hour) => {
                                d.setHours(hour, 0);
                                return (
                                    <>
                                        <span className="h-20 inline-block align-text-bottom text-sm">
                                            {getTimeFormatted(d)}    
                                        </span>
                                    </>
                                )
                            }
                        )
                }
            </div>
        </>
    )
}

export default CalendarSidebar;