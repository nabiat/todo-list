class ToDo {
    constructor(title, notes, due, priority, status) {
        this.due = due;
        this.note = notes;
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
}

export { ToDo };