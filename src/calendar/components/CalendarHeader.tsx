
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface HeaderProp {
    weekDates: Date[];
}

const CalendarHeader = (props: HeaderProp) => {
    return (
        <>
            <div className="ml-12">
                <div id="calendar_header" className="grid grid-rows-2 w-full border-b border-gray-400 pb-1 mx-2">
                    <div className="grid grid-cols-7 px-2 pt-3 text-center min-w-72">
                        {DAYS.map((day) => <span> {day} </span>)}
                    </div>
                    <div className="grid grid-cols-7 px-2 pt-3 text-center">
                        {
                            props.weekDates.map((day) =>
                                <span className="text-2xl"> {day.getDate()} </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CalendarHeader;