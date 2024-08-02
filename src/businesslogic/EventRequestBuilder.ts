import {Category, CreateEventRequest} from "./types.ts";

// TODO; DIDNT TEST!!!
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class EventRequestBuilder {
    private title: string;
    private location?: string;
    private organizer: string;
    private start: Date = new Date();
    private end: Date;
    private status: "Free" | "Busy" | "Tentative";
    private allday: boolean = false;
    private webpage?: string;
    private imagedata?: string | "REMOVE";
    private categories?: number[] = [];
    private extra?: any;

    setTitle(title: string): EventRequestBuilder {
        this.title = title;
        return this;
    }

    setLocation(location: string): EventRequestBuilder {
        this.location = location;
        return this;
    }

    setOrganizer(organizer: string): EventRequestBuilder {
        this.organizer = organizer;
        return this;
    }

    setStart(start: Date): EventRequestBuilder {
        this.start = start;
        return this;
    }

    setEnd(end: Date): EventRequestBuilder {
        this.end = end;
        return this;
    }

    setStatus(status: "Free" | "Busy" | "Tentative"): EventRequestBuilder {
        this.status = status;
        return this;
    }

    setAllday(allday: boolean): EventRequestBuilder {
        if (allday) {
            this.start.setHours(0, 0);
            this.end = new Date(this.start);
            this.end.setHours(23, 59);
        }
        this.allday = allday;
        return this;
    }

    setWebpage(webpage: string): EventRequestBuilder {
        this.webpage = webpage;
        return this;
    }

    setImagedata(image: string | "REMOVE"): EventRequestBuilder {
        if (image === "REMOVE") this.imagedata = null;
        else this.imagedata = image;
        return this;
    }

    addCategory(category: Category): EventRequestBuilder {
        this.categories.push(category.id);
        return this;
    }

    addCategoryById(category: number): EventRequestBuilder {
        this.categories.push(category);
        return this;
    }

    addCategories(categories: number[]): EventRequestBuilder {
        this.categories.push(...categories);
        return this;
    }

    setExtra(extra: any): EventRequestBuilder {
        this.extra = extra;
        return this;
    }

    build(): CreateEventRequest {
        //TODO; Also send CreateCategoryRequest if category is not already existing.
        // Be cautious with duplicate category ids and names, mabye retrieve all existing before hand
        if (this.title.length > 50) throw new Error("Title too long");
        if (this.location && this.location.length > 50) throw new Error("Location too long");
        if (this.organizer.length > 50) throw new Error("Organizer too long");
        if (!EMAIL_REGEX.test(this.organizer)) throw new Error("Organizer is not a valid email");
        if (this.webpage && this.webpage.length > 100) throw new Error("Webpage too long");

        return {
            title: this.title,
            location: this.location,
            organizer: this.organizer,
            start: this.start.toISOString(),
            end: this.end.toISOString(),
            status: this.status,
            allday: this.allday,
            webpage: this.webpage,
            imagedata: this.imagedata,
            categories: this.categories ? this.categories.map(id => ({id})) : [],
            extra: this.extra
        };
    }
}

export default EventRequestBuilder;