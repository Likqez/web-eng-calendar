// oshea-02.08.2024: Hamburger, cheeseburger, bigmac, whopper
import {IoChevronBackSharp, IoChevronForwardSharp, IoSettingsSharp} from "react-icons/io5";
import React, {useEffect, useRef, useState} from "react";
import {calcWeekDates} from "../../businesslogic/util/DateUtil.ts";

interface HeaderProp {
    onProfileClick: () => void;
    calendarDate: Date;
    changeCalendarDate: (date: Date) => void;
}

const Header = (props: HeaderProp) => {
    const weekDisplay = useRef<HTMLSpanElement>(null);

    const goToPreviousWeek = () => {
        const date = new Date(props.calendarDate);
        date.setDate(date.getDate() - 7);
        props.changeCalendarDate(date);
    };

    const goToNextWeek = () => {
        const date = new Date(props.calendarDate);
        date.setDate(date.getDate() + 7);
        props.changeCalendarDate(date);
    };

    useEffect(() => {
        const weekDates: Date[] = calcWeekDates(props.calendarDate);
        if(weekDates.length === 0) return;

        const fromDate = `${weekDates[0].getDate()}.${weekDates[0].getMonth() + 1}`;
        const toDate = `${weekDates[6].getDate()}.${weekDates[6].getMonth() + 1}`;

        weekDisplay.current!.innerText = `${fromDate} - ${toDate}`;
    }, [props.calendarDate]);

    return (
        <>
            <div id="header" className="flex flex-row h-14 border-b-2 border-gray-400 min-w-72">
                {/*Current Week*/}
                <div className="pl-60 flex items-center justify-center">
                    <div className="max-w-40 flex text-xl text-neutral-800 text-nowrap">
                        <button className="ml-auto has-tooltip" onClick={goToPreviousWeek}>
                            <IoChevronBackSharp/>
                            <span className='tooltip'>Prev. Week</span>
                        </button>
                        <span ref={weekDisplay} className="px-20 ml-2 font-bold">test</span>
                        <button className="ml-1 has-tooltip" onClick={goToNextWeek}>
                            <IoChevronForwardSharp/>
                            <span className='tooltip'>Next Week</span>
                        </button>
                    </div>
                </div>
                {/* Settings options */}
                <IoSettingsSharp className="flex-none fill-black py-2 w-fit h-full ml-auto mr-2 my-auto"/>

                {/* "User icon" only really used for fun stuff :) */}
                <img alt="user profile" title="Click for the funnies :)" src="/goose_funnies.jpeg"
                     className="flex-none w-10 h-10 rounded-full mr-2 my-2 z-50"
                     onClick={props.onProfileClick}
                />
            </div>
        </>
    );
}

export default Header;