import React from "react";

export const HEIGHT = 1500;
export const ENTRY_HEIGHT = (HEIGHT / 24);

const CalendarVisualGrid = () => {
    return (
        <>
        <div id="calendar_visual_grid">
            {/* Horizontal lines */}
            <div id="calendar_horizontal" className="grid grid-rows-24 absolute w-full px-2 min-w-72" style={{height: `${HEIGHT}px`}}>
                {
                    Array.from(Array(24).keys())
                        .map(k =>
                            <React.Fragment key={`visgrid_horizontal_${k}`}>
                                <div className={`h full w-full ${k == 0 ? 'border-t-[1px]' : 'border-b-[1px]'} border-black`}></div>
                            </React.Fragment>
                        )
                }
            </div>

            {/* Vertical lines */}
            <div id="calendar_vertical" className="grid grid-cols-7 w-full absolute px-2 min-w-72" style={{height: `${HEIGHT}px`}}>
                {
                    Array.from(Array(7).keys())
                        .map(k =>
                            <React.Fragment key={`visgrid_vertical_${k}`}>
                                <div className={`h-full w-full ${k == 0 ? 'border-l-[1px]' : 'border-r-[1px]'} border-black`}> </div>
                            </React.Fragment>
                        )
                }
            </div>
        </div>
        </>
    )
}

export default CalendarVisualGrid;