import React from "react";
import { getTimeFormatted } from "../../businesslogic/util/DateUtil";
import { ENTRY_HEIGHT } from "./CalendarVisualGrid";

const CalendarSidebar = () => {
    const d = new Date();

    return (
        <>
            <div id="calendar_sidebar" className="grid grid-rows-24 w-12 pl-6">
                {
                    Array.from(Array(24).keys())
                        .map((hour) => {
                                d.setHours(hour, 0);
                                return (
                                    <React.Fragment key={`calendar_sidebar_${hour}`}>
                                        <span className="inline-block align-text-bottom text-sm" style={{height: `${ENTRY_HEIGHT}px`}}>
                                            {getTimeFormatted(d)}    
                                        </span>
                                    </React.Fragment>
                                )
                            }
                        )
                }
            </div>
        </>
    )
}

export default CalendarSidebar;