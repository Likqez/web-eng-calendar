import React, {useState, useEffect} from 'react';
import {
    IoAtOutline, IoBriefcaseOutline,
    IoCloseSharp,
    IoLocationOutline,
    IoTimeOutline
} from "react-icons/io5";
import {CalendarEvent} from "../../businesslogic/types.ts";
import {EMAIL_REGEX} from "../../businesslogic/EventRequestBuilder.ts";

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

    // Add state for validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Validation function
    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!title || title.length > 50) newErrors.title = "Title is required and must be less than 50 characters.";
        if (location && location.length > 50) newErrors.location = "Location must be less than 50 characters.";
        if (!organizer || EMAIL_REGEX.test(organizer)) newErrors.organizer = "Organizer must be a valid email.";
        if (!start) newErrors.start = "Start date and time are required.";
        if (!end) newErrors.end = "End date and time are required.";
        if (webpage && webpage.length > 100) newErrors.webpage = "Webpage must be less than 100 characters.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative" // set modal size here
                 style={{maxHeight: 'calc(100vh - 50px)', overflowY: 'auto'}}>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
                    <IoCloseSharp/>
                </button>
                <form onSubmit={onSubmit}>
                    {/*<div className="flex justify-start text-2xl pb-3">*/}
                    {/*    <h1>Event Details</h1>*/}
                    {/*</div>*/}
                    <div className="mb-4">
                        <div className="flex justify-start">
                            <div className="pr-10 max-w-10"></div>
                            <input
                                type="text"
                                value={title}
                                placeholder={'Enter Title'}
                                required={true}
                                maxLength={50}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-xl w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-b-blue-500 transition duration-200"
                            />
                        </div>
                    </div>

                    <div className="mb-4 text-sm">
                        <div className="flex items-center justify-start">
                            <div className="max-w-10 w-full align-text-bottom text-3xl"><IoTimeOutline/></div>
                            <input
                                type="date"
                                required={true}
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                className="w-1/3 px-3 py-2 border-b-2 border-b-gray-300 focus:outline-none focus:border-b-blue-500 transition duration-200"
                            />

                            <div className="px-2 flex items-center justify-between">
                                <input
                                    type="time"
                                    required={true}
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="px-3 py-2 border-b-2 border-b-gray-300 focus:outline-none focus:border-b-blue-500 transition duration-200"
                                />
                                <span className="px-4">until</span>

                                <input
                                    type="time"
                                    required={true}
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="px-3 py-2 border-b-2 border-b-gray-300 focus:outline-none focus:border-b-blue-500 transition duration-200"
                                />
                            </div>

                            <input
                                type="date"
                                required={true}
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                className="w-1/3 px-3 py-2 border-b-2 border-b-gray-300 focus:outline-none focus:border-b-blue-500 transition duration-200"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-center">
                            <div className="pr-10 max-w-10"></div>
                            <input
                                type="checkbox"
                                checked={allday}
                                defaultChecked={false}
                                className="text-3xl"
                                onChange={(e) => {
                                    setAllday(e.target.checked);
                                    setStartTime(e.target.checked ? '00:00' : startTime);
                                    setEndTime(e.target.checked ? '23:59' : endTime);
                                    if (!end) setEnd(e.target.checked ? start : end)
                                }}/>

                            <label className="text-sm ml-2">All Day Event</label>
                        </div>
                    </div>

                    {/*Organizer*/}
                    <div className="mb-4">
                        <div className="flex justify-start">
                            <div className="max-w-10 w-full align-text-bottom text-3xl"><IoAtOutline /></div>
                            <input
                                type="text"
                                required={true}
                                value={organizer}
                                placeholder={'Enter Organizer Email'}
                                maxLength={50}
                                onChange={(e) => setOrganizer(e.target.value)}
                                className={`w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-b-blue-500 transition duration-200 ${errors.organizer ? 'border-red-400' : ''}`}
                            />
                            {/*TODO: Validate like this?*/}
                            {errors.organizer && <p className="text-red-500 text-sm">{errors.organizer}</p>}
                        </div>

                    </div>

                    {/*Location*/}
                    <div className="mb-4">
                        <div className="flex items-center justify-start">
                            <div className="max-w-10 w-full align-text-bottom text-3xl"><IoLocationOutline/></div>
                            <input
                                type="text"
                                value={location}
                                placeholder={'Enter Location'}
                                maxLength={50}
                                onChange={(e) => setLocation(e.target.value)}
                                className={`w-full px-3 focus:py-2 ${location ? 'py-2' : ''} focus:border-b-2 border-b-gray-300 focus:outline-none focus:border-b-blue-500 transition duration-200`}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center justify-start">
                            <div className="max-w-10 w-full align-text-bottom text-3xl">
                                <IoBriefcaseOutline />
                            </div>
                            <select
                                value={status}
                                required={true}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-fit px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-b-blue-500 transition duration-200"
                            >
                                <option value="Free">Free</option>
                                <option value="Busy">Busy</option>
                                <option value="Tentative">Tentative</option>
                            </select>
                        </div>

                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Webpage</label>
                        <input
                            type="text"
                            value={webpage}
                            onChange={(e) => setWebpage(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                        {imageurl && (
                            <img src={imageurl} alt="Image" className="mt-2 max-h-96"/>
                        )}
                    </div>
                    {/*<div className="mb-4">*/}
                    {/*    <label className="block text-gray-700">Categories</label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        value={categories.map(cat => cat.name).join(', ')}*/}
                    {/*        readOnly*/}
                    {/*        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"*/}
                    {/*    />*/}
                    {/*</div>*/}
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