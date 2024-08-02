import './App.css'
import Header from "./header/components/Header.tsx";
import Sidebar from "./sidebar/components/Sidebar.tsx";
import {useState} from "react";
import {SidebarCalendarProps} from "./sidebar/components/SidebarCalendar.tsx";

function App() {
    const [calendarDate, setCalendarDate] = useState(new Date()) // State for the main calendar showing the weekly view
    const [sideBarCalendarDate, setSideBarCalendarDate] = useState(new Date()) // State for the sidebar calendar showing the monthly view

    const sidebarCalendarProp: SidebarCalendarProps = {
        displayDate: calendarDate,
        selectedDate: sideBarCalendarDate,
        onDisplayDateChange: setCalendarDate,
        onDateSelected: setSideBarCalendarDate,
    }

    return (
        <>
            <Sidebar visible={sideBarCalendarVisible} sidebar={sidebarCalendarProp}/>
            <br/><br/><br/>
        </>
    )
}

export default App
