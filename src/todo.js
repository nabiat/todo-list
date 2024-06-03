class ToDo {
    constructor(title, note, due, priority, status) {
        this.due = due;
        this.note = note;
        this.title = title;
        this.status = status;
        this.priority = priority;
    }

    updateDue(newDate) {
        this.due = newDate;
    }

    updateNotes(newNote) {
        this.note = newNote;
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
    }

    get taskTitle() {
        return this.title;
    }

    get taskNote() {
        return this.note;
    }

    get taskDue() {
        return this.due;
    }

    get taskPriority() {
        return this.priority;
    }

    get taskStatus() {
        return this.status;
    }
}

export { ToDo };