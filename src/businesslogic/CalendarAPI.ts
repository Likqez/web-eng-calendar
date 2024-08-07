import {CreateEventRequest, CreateEventResponse, RetrieveEventResponse, UpdateEventRequest} from "./types.ts";

const HOST = "https://dhbw.radicalsimplicity.com/calendar/187187187"

export async function retrieveEvent(eventId: number): Promise<RetrieveEventResponse> {
    const response = await fetch(`${HOST}/events/${eventId}`);
    if (!response.ok) {
        throw new Error("Failed to retrieve event");
    }
    return await response.json();
}

export async function retrieveAllEvents(): Promise<RetrieveEventResponse[]> {
    const response = await fetch(`${HOST}/events`);
    if (!response.ok) {
        throw new Error("Failed to retrieve events");
    }
    return await response.json();
}

export async function createEvent(event: CreateEventRequest): Promise<CreateEventResponse> {
    const response = await fetch(`${HOST}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    });
    if (!response.ok) {
        throw new Error("Failed to create event");
    }
    return response.json();
}

export async function updateEvent(eventId: number, event: UpdateEventRequest): Promise<CreateEventResponse> {
    const response = await fetch(`${HOST}/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    });
    if (!response.ok) {
        throw new Error("Failed to update event");
    }
    return response.json();
}