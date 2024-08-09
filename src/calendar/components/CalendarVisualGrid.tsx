import React from "react";

const CalendarVisualGrid = () => {
    return (
        <>
        <div id="calendar_visual_grid">
            {/* Horizontal lines */}
            <div id="calendar_horizontal" className="grid grid-rows-24 absolute h-full w-full px-2 min-w-72">
                {
                    Array.from(Array(24).keys())
                        .map(k =>
                            <React.Fragment key={`visgrid_horizontal_${k}`}>
                                <div className="h-full w-full border-y-[1px] border-black"></div>
                            </React.Fragment>
                        )
                }
            </div>

            {/* Vertical lines */}
            <div id="calendar_vertical" className="grid grid-cols-7 h-full w-full absolute px-2 min-w-72">
                {
                    Array.from(Array(7).keys())
                        .map(k =>
                            <React.Fragment key={`visgrid_vertical_${k}`}>
                                <div className="h-full w-full border-x-[1px] border-black"> </div>
                            </React.Fragment>
                        )
                }
            </div>
        </div>
        </>
    )
}

export default CalendarVisualGrid;