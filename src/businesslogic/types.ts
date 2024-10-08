export type Category = {
    id: number;
    name: string; // max 30 characters
};

export type CalendarEvent = {
    id: number;
    title: string;
    location?: string;
    organizer: string;
    start: Date;
    end: Date;
    status: "Free" | "Busy" | "Tentative";
    allday?: boolean;
    webpage?: string;
    imageurl?: string;
    categories?: Category[];
    extra?: object;
};

// Create Event Request
export type CreateEventRequest = {
    title: string;
    location?: string;
    organizer: string;
    start: string; //supported formats: yyyy-MM-dd'T'HH:mm, yyyy-MM-dd'T'HH:mm:ss'Z', yyyy-MM-dd'T'HH:mm:ss.mmm'Z'
    end: string; //supported formats: yyyy-MM-dd'T'HH:mm, yyyy-MM-dd'T'HH:mm:ss'Z', yyyy-MM-dd'T'HH:mm:ss.mmm'Z'
    status: "Free" | "Busy" | "Tentative";
    allday?: boolean;
    webpage?: string;
    imagedata?: string | "REMOVE";
    categories?: { id: number }[];
    extra?: object;
};

// Create Event Response
export type CreateEventResponse = RetrieveEventResponse;

// Retrieve Event by ID Response
export type RetrieveEventResponse = {
    id: number;
    title: string; // mandatory, max 50 characters
    location: string | null; // optional, max 50 characters
    organizer: string; // mandatory, max 50 characters, valid email
    start: string; // mandatory, supported formats: yyyy-MM-dd'T'HH:mm, yyyy-MM-dd'T'HH:mm:ss'Z', yyyy-MM-dd'T'HH:mm:ss.mmm'Z'
    end: string; // mandatory, supported formats: yyyy-MM-dd'T'HH:mm, yyyy-MM-dd'T'HH:mm:ss'Z', yyyy-MM-dd'T'HH:mm:ss.mmm'Z'
    status: "Free" | "Busy" | "Tentative"; // mandatory
    allday: boolean; // optional, defaults to false
    webpage: string | null; // optional, max 100 characters
    imageurl: string | null; // optional, URL to image
    categories: Category[]; // optional
    extra: object | null; // optional, structure not defined, max length 2000 characters
};

// Update Event Request (same as CreateEventRequest)
export type UpdateEventRequest = CreateEventRequest;

// Update Event Response (same as CreateEventResponse)
export type UpdateEventResponse = CreateEventResponse;

// Delete Event Response (no response body)
export type DeleteEventResponse = void;

// List Categories Response
export type ListCategoriesResponse = Category[];

// Create Category Request
export type CreateCategoryRequest = {
    name: string;
};

// Create Category Response
export type CreateCategoryResponse = {
    id: number;
    name: string; // max 30 characters
};

// Retrieve Category by ID Response
export type RetrieveCategoryResponse = Category;

// Delete Category Response (no response body)
export type DeleteCategoryResponse = void;

// Add Event to Category Response (no response body)
export type AddEventToCategoryResponse = void;

// Remove Event from Category Response (no response body)
export type RemoveEventFromCategoryResponse = void;

// Add Image to Event Request
export type AddImageToEventRequest = {
    imagedata: string;
};

// Add Image to Event Response (no response body)
export type AddImageToEventResponse = void;

// Remove Image from Event Response (no response body)
export type RemoveImageFromEventResponse = void;

// Mapper
export const mapToEvent = (event: RetrieveEventResponse): CalendarEvent => {
    return {
        id: event.id,
        title: event.title,
        location: event.location,
        organizer: event.organizer,
        start: new Date(event.start),
        end: new Date(event.end),
        status: event.status,
        allday: event.allday,
        webpage: event.webpage,
        imageurl: event.imageurl,
        categories: event.categories,
        extra: event.extra
    };
}