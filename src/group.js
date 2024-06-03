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

    getTask(taskId) {
        return this.tasks[taskId];
    }

    get groupTitle() {
        return this.title;
    }

    get groupTasks() {
        return this.tasks;
    }
}

export { Group };