import './App.css'
import Header from "./header/components/Header.tsx";
import SidebarCalendar from "./sidebar/components/SidebarCalendar.tsx";
import {useState} from "react";

function App() {
    const [calendarDate, setCalendarDate] = useState(new Date()) // State for the main calendar showing the weekly view
    const [sideBarCalendarDate, setSideBarCalendarDate] = useState(new Date()) // State for the sidebar calendar showing the monthly view
    return (
        <>
            <Header/>
            <SidebarCalendar date={sideBarCalendarDate} onDateChange={setSideBarCalendarDate}/>
        </>
    )
}

export default App
