import {isSameDate} from "../../businesslogic/util/DateUtil.ts";


const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface HeaderProp {
    weekDates: Date[];
    selectedDate: Date;
}

const CalendarHeader = (props: HeaderProp) => {
    const { weekDates, selectedDate } = props;

    return (
        <>
            <div className="flex flex-row w-full">
                {/* Empty contaienr for positioning */}
                <div className="min-w-12 w-12 max-w-12"></div>

                {/* Header */}
                <div id="calendar_header" className="grid grid-rows-2 w-full pb-2 border-b-2 border-gray-400">
                    <div className="grid grid-cols-7 px-4 pt-3 text-center min-w-72">
                        {DAYS.map((day) => <span> {day} </span>)}
                    </div>
                    <div className="grid grid-cols-7 px-4 pt-3 text-center">
                        {
                            weekDates.map((day) =>
                                <WeekDay date={day} selectedDate={selectedDate} />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

interface WeekDayProp {
    date: Date;
    selectedDate: Date;
}

const WeekDay = (props: WeekDayProp) => {
    const { date, selectedDate } = props;

    const isToday = isSameDate(date, new Date());
    const isSelected = isSameDate(selectedDate, date);

    return (
        <>
            <div>
                <div className={`rounded-full hover:bg-blue-100 
                ${isSelected ? "bg-blue-300 hover:bg-blue-400" : ""}
                ${isToday ? "bg-blue-500 hover:bg-blue-600" : ""}
                `}>

                    <div className={`calendar_day
                    "text-black"
                    ${isSelected ? "text-blue-700" : ""}
                    ${isToday ? "text-white" : ""}
                    `}>
                        {date.getDate()}
                    </div>
                </div>

            </div>
        </>
    );
}

export default CalendarHeader;