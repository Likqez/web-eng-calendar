import './App.css'
import {Header} from "./header/components/Header.tsx";
import SidebarCalendar from "./sidebar/components/SidebarCalendar.tsx";

function App() {
    // const date = new Date(2024, 7, 28);
    return (
        <>
            <Header/>
            <SidebarCalendar/>
        </>
    )
}

export default App
