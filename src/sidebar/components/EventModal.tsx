import React, {useState, useEffect, useMemo} from 'react';
import {
    IoAtOutline, IoBriefcaseOutline,
    IoCloseSharp, IoEarthOutline,
    IoLocationOutline, IoTimeOutline, IoTrashOutline
} from "react-icons/io5";
import {CalendarEvent} from "../../businesslogic/types.ts";
import {generateUniqueHexColor} from "../../businesslogic/util/ColorGenerationUtil.ts";

interface ModalProps {
    onClose: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    event?: CalendarEvent | null;
}

const Modal: React.FC<ModalProps> = ({onClose, onSubmit, event}) => {
    const [title, setTitle] = useState(event?.title || '');
    const [location, setLocation] = useState(event?.location || '');
    const [organizer, setOrganizer] = useState(event?.organizer || '');
    const [start, setStart] = useState(event ? event.start.toISOString().substring(0, 16) : '');
    const [startTime, setStartTime] = useState(event ? event.start.toISOString().substring(11, 16) : '');
    const [end, setEnd] = useState(event ? event.end.toISOString().substring(0, 16) : '');
    const [endTime, setEndTime] = useState(event ? event.end.toISOString().substring(11, 16) : '');
    const [status, setStatus] = useState(event?.status || 'Free');
    const [allday, setAllday] = useState(event?.allday || false);
    const [webpage, setWebpage] = useState(event?.webpage || '');
    const [imageurl, setImageurl] = useState(event?.imageurl || '');
    const [categories, setCategories] = useState(event?.categories || []);

    const imageInputRef = React.createRef<HTMLInputElement>();

    // Memoize the header color
    const headerColor = useMemo(() => generateUniqueHexColor(event ? event.id : Math.random()*100), [event]);
    console.log(headerColor);

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setLocation(event.location || '');
            setOrganizer(event.organizer);
            setStart(event.start.toISOString().substring(0, 16));
            setEnd(event.end.toISOString().substring(0, 16));
            setStatus(event.status);
            setAllday(event.allday || false);
            setWebpage(event.webpage || '');
            setImageurl(event.imageurl || '');
            setCategories(event.categories || []);
        }
    }, [event]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageurl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-3 rounded shadow-lg relative w-[512px]"
                 style={{maxHeight: 'calc(100vh - 50px)', overflowY: 'auto'}}>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
                    <IoCloseSharp/>
                </button>

                <div className="w-full h-24 rounded"
                     style={{backgroundColor: imageurl ? 'transparent' : `${headerColor}`}}>
                    {imageurl && imageurl !== "REMOVE" && (
                        <img src={imageurl} alt="Image" className="h-full w-full object-cover rounded"/>
                    )}
                </div>
                <div className="mb-2 w-full h-0 border-b border-gray-300"></div>

                <form onSubmit={submitEvent=> {
                    submitEvent.preventDefault();
                    onSubmit(submitEvent);
                }}>
                    <div className="mb-5">
                        <div className="flex justify-start">
                            <div className="pr-10 max-w-10"></div>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                placeholder={'Enter Title'}
                                required={true}
                                maxLength={50}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-xl w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:border-b-blue-500 transition duration-200"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-start items-center">
                            <div className="max-w-10 w-full align-text-bottom text-2xl pr-10"><IoTimeOutline/></div>

                            <div id="time" className="flex w-full items-center justify-start text-sm">
                                <div className="flex items-center justify-start">
                                    <input
                                        type="date"
                                        required={true}
                                        value={start}
                                        name="start"
                                        onChange={(e) => setStart(e.target.value)}
                                        className="max-w-full px-1 mr-1 py-2 border-b-2 hover:bg-gray-100 border-b-gray-300 focus:outline-none focus:border-b-blue-500 transition duration-200"
                                    />

                                    <input
                                        type="time"
                                        required={true}
                                        hidden={allday}
                                        value={startTime}
                                        name="startTime"
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="px-1 py-2 border-b-2 border-b-gray-300 hover:bg-gray-100 focus:outline-none focus:border-b-blue-500 transition duration-200"
                                    />
                                </div>
                                <span className="px-1">-</span>

                                <div className="flex items-center justify-start">
                                    <input
                                        type="time"
                                        hidden={allday}
                                        required={true}
                                        value={endTime}
                                        name="endTime"
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="px-1 py-2 border-b-2 border-b-gray-300 hover:bg-gray-100 focus:outline-none focus:border-b-blue-500 transition duration-200"
                                    />
                                    <input
                                        type="date"
                                        required={true}
                                        value={end}
                                        name="end"
                                        onChange={(e) => setEnd(e.target.value)}
                                        className="max-w-full px-1 ml-1 py-2 border-b-2 hover:bg-gray-100 border-b-gray-300 focus:outline-none focus:border-b-blue-500 transition duration-200"
                                    />
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-start">
                            <div className="pr-10 max-w-10"></div>
                            <input
                                type="checkbox"
                                value={allday}
                                defaultChecked={false}
                                className="text-3xl"
                                name="allday"
                                onChange={(e) => {
                                    setAllday(e.target.checked);
                                    setStartTime(e.target.checked ? '00:00' : startTime);
                                    setEndTime(e.target.checked ? '23:59' : endTime);
                                    if (!end) setEnd(e.target.checked ? start : end)
                                }}/>

                            <label className="text-sm ml-2">All Day Event</label>
                        </div>
                    </div>

                    {/*Organizer & Status*/}
                    <div className="mb-3">
                        <div className="flex justify-start items-center">
                            <div className="max-w-10 w-full align-text-bottom text-2xl"><IoAtOutline/></div>
                            <input
                                type="email"
                                required={true}
                                value={organizer}
                                placeholder={'Organizer Email'}
                                maxLength={50}
                                name="organizer"
                                onChange={(e) => setOrganizer(e.target.value)}
                                className={`text-sm px-3 w-full py-2 border-b-2 border-gray-300 hover:bg-gray-100 focus:outline-none focus:border-b-blue-500 transition duration-200`}
                            />

                            <div className="ml-3 max-w-10 w-full align-text-bottom text-2xl"><IoBriefcaseOutline/></div>
                            <select
                                value={status}
                                required={true}
                                name="status"
                                onChange={(e) => setStatus(e.target.value)}
                                className="text-sm w-2/3 px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-b-blue-500 transition duration-200"
                            >
                                <option value="Free">Free</option>
                                <option value="Tentative">Tentative</option>
                                <option value="Busy">Busy</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 mb-1 w-full h-0 border-b border-gray-300"></div>

                    {/*Location*/}
                    <div className="mb-1">
                        <div className="flex items-center justify-start">
                            <div className="max-w-10 w-full text-2xl"><IoLocationOutline/></div>
                            <input
                                type="text"
                                value={location}
                                name="location"
                                placeholder={'Location'}
                                maxLength={50}
                                onChange={(e) => setLocation(e.target.value)}
                                className={`text-sm w-full px-3 focus:py-2 ${location ? 'py-2' : ''} hover:bg-gray-100 focus:border-b-2 focus:outline-none focus:border-b-blue-500 transition duration-200`}
                            />
                        </div>
                    </div>

                    <div className="mb-1">
                        <div className="flex justify-start items-center">
                            <div className="max-w-10 w-full align-text-bottom text-2xl"><IoEarthOutline/></div>
                            <input
                                type="text"
                                value={webpage}
                                name="webpage"
                                maxLength={100}
                                placeholder='Website'
                                onChange={(e) => setWebpage(e.target.value)}
                                className={`text-sm w-full px-3 focus:py-2 ${webpage ? 'py-2' : ''} hover:bg-gray-100 focus:border-b-2 focus:outline-none focus:border-b-blue-500 transition duration-200`}
                            />
                        </div>
                    </div>

                    <div className="mb-2 w-full h-0 border-b border-gray-300"></div>

                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-gray-700">Header:</label>
                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleImageChange}
                            className="w-2/3 px-3 py-2 focus:outline-none transition duration-200"
                        />
                        <button onClick={() => {
                            setImageurl('');
                            if (imageInputRef.current)
                                imageInputRef.current.value = '';
                            else (setImageurl('REMOVE'))

                        }} className="p-2 text-red-500 hover:text-red-300 transition duration-200 text-2xl"
                        >
                            <IoTrashOutline/>
                        </button>
                    </div>

                    {/* Hidden input fields to pass the values of the state using the Form*/}
                    <input type="number" hidden value={event ? event.id : ''}/>
                    <input type="text" name="imageData" hidden value={imageurl}/>
                    {/*<div className="mb-2">*/}
                    {/*    <label className="block text-gray-700">Categories</label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        value={categories.map(cat => cat.name).join(', ')}*/}
                    {/*        readOnly*/}
                    {/*        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className="mb-2 w-full h-0 border-b border-gray-300"></div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;