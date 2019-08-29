export class Todo {
    id?: number;
    title: string;
    description: string;
    date: Date

    constructor(title: string, description: string, date: Date) {
        this.title = title;
        this.description = description;
        this.date = date;
    }
}

