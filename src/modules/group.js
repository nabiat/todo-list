class Group {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskId) {
        this.tasks.splice(taskId, 1);
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }
}

export { Group };