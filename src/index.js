import './style.css';
import { Group } from './modules/group';
import { ToDo } from './modules/todo';

const groups = [];

let defaultG = new Group('Home');
defaultG.addTask(new ToDo('2024-04-13', '', 'Vacuum', false, 'High'));
defaultG.addTask(new ToDo('2024-04-13', '', 'Laundry', false, 'High'));
defaultG.addTask(new ToDo('2024-04-13', '', 'Organize', false, 'High'));
defaultG.addTask(new ToDo('2024-04-13', '', 'Clean bathrooms', false, 'High'));

groups.push(defaultG);

// Add/Cancel New Group Entries
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
    groups.push(new Group(document.getElementById('title').value));
    
    displayNewGroup(groups[groups.length - 1], groups.length - 1);

    document.querySelector('.group-dialog').close();
});

// Add/Cancel New Task Entries
let taskEntry = document.querySelector('.add-task');
taskEntry.addEventListener('click', (e) => {
    document.querySelector('form').reset();
    document.querySelector('.task-dialog').showModal();
});

let addTaskEntry = document.querySelector('.task-dialog .add');
addTaskEntry.addEventListener('click', (e) => {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let due = document.getElementById('due').value;
    let notes = document.getElementById('note').value;
    let priority = document.getElementById('priority').value;

    let newTask = new ToDo(due, notes, name, false, priority);
    groups[addTaskEntry.dataset.index].addTask(newTask);

    //update display

    document.querySelector('.task-dialog').close();
});

let cancelTaskEntry = document.querySelector('.task-dialog .cancel');
cancelTaskEntry.addEventListener('click', () => {
    document.querySelector('.task-dialog').close();
});


function displayNewGroup(groupObj, groupIndex) {
    let groups = document.querySelector('.groups');

    let group = document.createElement('div');
    group.className = 'group';
    
    let titleDiv = document.createElement('div');
    titleDiv.textContent = groupObj.get();

    let deleteInput = document.createElement('input');
    deleteInput.src = './icons/delete-outline.svg';
    deleteInput.dataset.index = groupIndex;
    deleteInput.className = 'delete-group';
    deleteInput.type = 'image';

    // add event listener to delete btn
    deleteInput.addEventListener('click', () => {
        // groups.splice(groupIndex, 1);
        // delete from groups arr
        deleteInput.parentNode.remove();
        // delete the tasks page on the right too
    });

    group.append(titleDiv, deleteInput);
    groups.append(group);
}


// FOR TEMPLATE HTML

// Delete group listeners
let deleteGroupBtns = document.querySelectorAll('.delete-group');
deleteGroupBtns.forEach((btn) =>
    btn.addEventListener('click', () => {
        btn.parentNode.parentNode.remove();
    })
);

// Delete tasks listeners
let deleteTaskBtns = document.querySelectorAll('.delete');
deleteTaskBtns.forEach((btn) =>
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

let editTitleBtn = document.querySelector('.edit-title');
editTitleBtn.addEventListener('click', () => {
    editTitleBtn.parentNode.querySelector('.group_name').textContent = 'new title';
});
