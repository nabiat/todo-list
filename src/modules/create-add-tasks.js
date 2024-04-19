import '../style.css';
import { ToDo } from './todo';
import { groupsArr } from './default-group';
import { title, dueDate, noteIcon, editIcon, deleteIcon } from './icon-functionality';

function createTask(task, groupIndex, taskIndex) {
    let newTask = document.createElement('form');
    newTask.dataset.gIndex = groupIndex;
    newTask.dataset.tIndex = taskIndex;
    newTask.id = 'tindex-' + taskIndex;
    newTask.className = 'task';
    
    let nonNote = document.createElement('div');
    nonNote.className = 'non-note';

    let leftSide = document.createElement('div');
    leftSide.className = 'left-info';

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    leftSide.append(checkBox, title(task.taskTitle), noteIcon());

    let rightSide = document.createElement('div');
    rightSide.className = 'right-info';

    rightSide.append(dueDate(task.taskDue), editIcon(taskIndex, 'edit'), 
    deleteIcon('delete'));

    nonNote.append(leftSide, rightSide);

    let toShowNote = document.createElement('div');
    toShowNote.className = 'note-div';

    newTask.append(nonNote, toShowNote);
    
    return newTask;
}

function addTaskBtn(groupIndex) {
    let taskBtn = document.createElement('button');
    taskBtn.dataset.gIndex = groupIndex;
    taskBtn.textContent = 'Add Task';
    taskBtn.className = 'add-task';

    taskBtn.addEventListener('click', () => {
        document.querySelector('form').reset();

        let addTaskDialog = document.querySelector('.task-dialog');
        let addBtnInDialog = addTaskDialog.querySelector('.add');
        addBtnInDialog.dataset.gIndex = taskBtn.dataset.gIndex;
        addTaskDialog.showModal();
    });

    return taskBtn;
}

let addTaskEntry = document.querySelector('.task-dialog .add');
addTaskEntry.addEventListener('click', (e) => {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let due = document.getElementById('due').value;
    let notes = document.getElementById('note').value;
    let priority = document.getElementById('priority').value;

    let newTask = new ToDo(name, notes, due, priority, false);
    groupsArr[addTaskEntry.dataset.gIndex].addTask(newTask);

    document.querySelector('.tasks').append(createTask(newTask, addTaskEntry.dataset.gIndex,
        groupsArr[addTaskEntry.dataset.gIndex].groupTasks.length - 1));

    
    document.querySelector('.task-dialog').close();
});

// TODO: cancel task btn

export { createTask, addTaskBtn }; 