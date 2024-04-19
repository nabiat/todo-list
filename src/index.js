import './style.css';
import { Group } from './modules/group';

import { groupsArr } from './modules/default-group';



// Add, Edit, Delete Tasks




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

    group.append(titleDiv, deleteIcon(groupIndex, 'delete-group'));
    groups.append(group);
}

// Creates input elements


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
