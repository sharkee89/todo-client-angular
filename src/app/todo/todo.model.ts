export class Todo {
    _id?: number;
    title: string;
    description: string;
    date: string;

    constructor(title: string, description: string, date: string) {
        this.title = title;
        this.description = description;
        this.date = date;
    }
}

