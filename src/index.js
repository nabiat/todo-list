import './style.css';
import { Group } from './modules/group';
import { ToDo } from './modules/todo';
import upArrow from './icons/arrow-up.svg';
import checkMark from './icons/check-outline.svg';

const groupsArr = [];

let defaultG = new Group('Home');
defaultG.addTask(new ToDo('Vacuum', 'hi', '2024-04-13', 'High', false));
defaultG.addTask(new ToDo('Laundry', '', '2024-04-13', 'High', false));
defaultG.addTask(new ToDo('Organize', '', '2024-04-13', 'High', false));
defaultG.addTask(new ToDo('Clean bathrooms', '', '2024-04-13', 'High', false));

groupsArr.push(defaultG);

// Default group
let projects = document.querySelectorAll('.group');
projects.forEach((proj) =>
    proj.addEventListener('click', () => {
        proj.style.background = 'gray';
        displayDefaultTaskPage(proj.dataset.index);
    })
);

function displayDefaultTaskPage(groupIndex) {
    let group = groupsArr[groupIndex];

    let rightPage = document.createElement('div');
    rightPage.className = 'right';
    rightPage.id = 'gindex-' + groupIndex;

    // Header
    let header = document.createElement('div');
    header.dataset.gIndex = groupIndex;
    header.className = 'right-header';

    let title = document.createElement('input');
    title.value = group.groupTitle;
    title.className = 'group-name';
    title.disabled = true;
    title.type = 'text';

    let edit = editBtn(groupIndex, 'edit-title');

    header.append(title, edit);

    // Tasks
    let tasksDiv = document.createElement('div');
    tasksDiv.className = 'tasks';

    let addTaskDiv = document.createElement('div');
    addTaskDiv.className = 'add-task-div';

    addTaskDiv.append(addTaskBtn(groupIndex));

    for (let i = 0; i < group.groupTasks.length; i++) {
        let task = group.groupTasks[i];
        tasksDiv.append(createTask(task, groupIndex, i));
    }

    rightPage.append(header, tasksDiv, addTaskDiv);

    document.querySelector('.main').append(rightPage);
}

// Add, Edit, Delete Tasks
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

    leftSide.append(checkBox, title(task.taskTitle), noteBtn());

    let rightSide = document.createElement('div');
    rightSide.className = 'right-info';

    rightSide.append(dueDate(task.taskDue), editBtn(taskIndex, 'edit'), 
    deleteBtn('delete'));

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

function editTask(editBtn) {
    let currTask = editBtn.parentNode.parentNode.parentNode;
    if (currTask.querySelector('.edit').src === checkMark) {
        let taskIndex = currTask.dataset.tIndex;
        let groupIndex = currTask.dataset.gIndex;
        
        currTask.querySelector('.task-due').disabled = true;
        currTask.querySelector('.task-name').disabled = true;
        currTask.querySelector('.display-note').disabled = true;

        groupsArr[groupIndex].groupTasks[taskIndex].updateTitle(currTask.querySelector('.task-name').value);
        groupsArr[groupIndex].groupTasks[taskIndex].updateDue(currTask.querySelector('.task-due').value);
        groupsArr[groupIndex].groupTasks[taskIndex].updateNotes(currTask.querySelector('.display-note').value);

        currTask.querySelector('.edit').src = './icons/pencil-outline.svg';

        // close note if arrow down
        if (currTask.querySelector('.note').src !== upArrow) {
            currTask.querySelector('.display-note').remove();
        }
    } else {
        let groupIndex = currTask.dataset.gIndex;
        let taskIndex = currTask.dataset.tIndex;

        // show note if arrow is down
        if (currTask.querySelector('.note').src !== upArrow) {
            let noteDiv = document.createElement('div');
            currTask.append(noteDiv);

            let noteArea = textArea(groupsArr[groupIndex].groupTasks[taskIndex].taskNote);
            noteDiv.append(noteArea);
        }

        currTask.querySelector('.edit').src = checkMark;
        currTask.querySelector('.task-due').disabled = false;
        currTask.querySelector('.task-name').disabled = false;
        currTask.querySelector('.display-note').disabled = false;
    }
}

function deleteTask(deleteBtn) {
    let currTask = deleteBtn.parentNode.parentNode.parentNode;
    let currTaskIndex = currTask.dataset.tIndex;
    let currGroupIndex = currTask.dataset.gIndex;

    while (currTask.nextSibling) {
        let siblingTask = currTask.nextSibling;
        let newIdx = siblingTask.dataset.tIndex - 1;

        siblingTask.dataset.tIndex = newIdx;
        siblingTask.id = 'tindex-' + newIdx;

        currTask = siblingTask;
    }

    groupsArr[currGroupIndex].groupTasks.splice(currTaskIndex, 1);
    document.getElementById(`tindex-${currTaskIndex}`).remove();
}


// Add, Edit, Delete Groups (add functinality to delete + edit buttons too ^)

// Listeners to Add/Cancel New Group Entries
let groupEntry = document.querySelector('.add-group');
groupEntry.addEventListener('click', (e) => {
    document.querySelector('form').reset();
    document.querySelector('.group-dialog').showModal();
});

let cancelGroupEntry = document.querySelector('.group-dialog .cancel');
cancelGroupEntry.addEventListener('click', () => {
    document.querySelector('.group-dialog').close();
});

let addGroupEntry = document.querySelector('.group-dialog .add');
addGroupEntry.addEventListener('click', (e) => {
    e.preventDefault();
    groupsArr.push(new Group(document.getElementById('title').value));
    
    displayNewGroup(groupsArr[groupsArr.length - 1], groupsArr.length - 1);

    document.querySelector('.group-dialog').close();
});


// Update display
function displayNewGroup(groupObj, groupIndex) {
    let groups = document.querySelector('.groups');

    let group = document.createElement('button');
    group.className = 'group';
    group.type = 'button';
    
    let titleDiv = document.createElement('input');
    titleDiv.textContent = groupObj.groupTitle;

    group.append(titleDiv, deleteBtn(groupIndex, 'delete-group'));
    groups.append(group);
}

// Creates input elements
function title(title) {
    let name = document.createElement('input');
    name.className = 'task-name';
    name.disabled = true;
    name.value = title;
    name.type = 'text';
    return name;
}

function dueDate(dueDate) {
    let due = document.createElement('input');
    due.className = 'task-due';
    due.value = dueDate;
    due.disabled = true;
    due.type = 'text';
    return due;
}

function textArea(taskNote) {
    let textArea = document.createElement('textarea');
    textArea.className = 'display-note';
    textArea.value = taskNote;
    textArea.disabled = true;
    return textArea;
}

function noteBtn() {
    let note = document.createElement('input');
    note.src = './icons/arrow-down.svg';
    note.className = 'note';
    note.type = 'image';

    note.addEventListener('click', (e) => {
        e.preventDefault();

        let currTask = note.parentNode.parentNode.parentNode;
        if (note.src === upArrow) {
            
            currTask.querySelector('.display-note').remove();
            note.src = './icons/arrow-down.svg';

        } else {
            let groupIndex = currTask.dataset.gIndex;
            let taskIndex = currTask.dataset.tIndex;

            let noteDiv = document.createElement('div');
            noteDiv.className = 'note-div';
            currTask.append(noteDiv);

            noteDiv.append(textArea(groupsArr[groupIndex].groupTasks[taskIndex].taskNote));

            note.src = upArrow;
        }
        
    });
    return note;
}

function editBtn(groupIndex, classCategory) {
    let edit = document.createElement('input');
    edit.src = './icons/pencil-outline.svg';
    edit.dataset.index = groupIndex;
    edit.className = classCategory;
    edit.type = 'image';

    edit.addEventListener('click', (e) => {
        e.preventDefault();
        if (edit.className === 'edit-title') {
            let mainTitles = document.querySelectorAll('.group-name');
            mainTitles.forEach((title) => {
                title.textContent = 'new title';
            });

            // update in group obj too!!!!!

            let pageHeader = edit.parentNode;
            if (pageHeader.querySelector('.edit-title').src === checkMark) {
                pageHeader.querySelector('.group-name').disabled = true;

                let groupIndex = pageHeader.dataset.gIndex;
                pageHeader.querySelector('.edit-title').src = './icons/pencil-outline.svg';
                groupsArr[groupIndex].updateTitle(pageHeader.querySelector('.group-name').value);

            } else {
                pageHeader.querySelector('.group-name').disabled = false;
                pageHeader.querySelector('.edit-title').src = checkMark;
            }
        } else editTask(edit);
    });
    return edit;
}

function deleteBtn(classCategory) {
    let deleteIcon = document.createElement('input');
    deleteIcon.src = './icons/delete-outline.svg';
    deleteIcon.className = classCategory;
    deleteIcon.type = 'image';

    deleteIcon.addEventListener('click', (e) => {
        e.preventDefault();

        if (deleteIcon.className === 'delete-group') {
            // document.getElementById(`gindex-${gIndex}`).remove();
            return;
        } else deleteTask(deleteIcon);
    });
    return deleteIcon;
}

// FOR TEMPLATE HTML

// Delete group listeners
let deleteGroupBtns = document.querySelectorAll('.delete-group');
deleteGroupBtns.forEach((btn) =>
    btn.addEventListener('click', () => {
        btn.parentNode.parentNode.remove();
    })
);

// Edit tasks listeners
let editBtns = document.querySelectorAll('.edit');
editBtns.forEach((btn) =>
    btn.addEventListener('click', () => {
        let date = btn.parentNode.querySelector('.task-due');
        let name = btn.parentNode.parentNode.querySelector('.task-name');
    
        date.textContent = 'new date';
        name.textContent = 'new name';
    })
);

let groupDeleteBtn = document.querySelector('.delete-group');
groupDeleteBtn.addEventListener('click', () => {
    groupDeleteBtn.parentNode.remove();
    document.querySelector('.right#default').remove();
});
