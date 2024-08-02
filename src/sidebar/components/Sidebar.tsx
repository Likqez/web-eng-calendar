// Represents the whole sidebar

import SidebarCalendar, {SidebarCalendarProps} from "./SidebarCalendar.tsx";
import {IoAddSharp} from "react-icons/io5";
import '../styling/Sidebar.css'
import {FC} from "react";

interface SidebarProps {
    sidebar: SidebarCalendarProps;
    visible: boolean;
}

const Sidebar: FC<SidebarProps> = (props: SidebarProps) => {
    return (
        <>
            <div id="sidebar" className="max-w-120 w-1/6 min-w-52 overflow-y-hidden" style={props.visible ? {} : {display: "none"}}>
                <div className="pr-6 pt-4 min-h-8 h-14 max-h-14">
                    <CreateButton/>
                </div>
                <div className="pt-8 flex justify-center">
                    <SidebarCalendar displayDate={props.sidebar.displayDate}
                                     selectedDate={props.sidebar.selectedDate}
                                     onDateSelected={props.sidebar.onDateSelected}
                                     onDisplayDateChange={props.sidebar.onDisplayDateChange}/>
                </div>
            </div>
        </>
    );
}

const CreateButton = () => {
    return (
        <>
            <div id="side_create_button"
                 className="flex w-fit h-full has-tooltip rounded-3xl drop-shadow-lg py-1 bg-white">
                <div className="aspect-square w-10">
                    <IoAddSharp className="pl-2 w-full h-full"/>
                </div>
                <span className="pl-2 pr-4 text-xl align-middle">Create</span>
                <span className="tooltip"> Create new event </span>
            </div>
        </>
    );
}

export default Sidebar;