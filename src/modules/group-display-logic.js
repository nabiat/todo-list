import { Group } from './group';
import { groupsArr } from '../index';
import { deleteIcon } from './input-functionality';
import { displayTaskPage } from './task-display-logic';

function displayGroup(groupIndex, groupTitle) {
    let groups = document.querySelector('.groups');

    let groupBtn = document.createElement('button');
    groupBtn.id = 'gindex-' + groupIndex;
    groupBtn.dataset.index = groupIndex;
    groupBtn.className = 'group';
    groupBtn.value = groupTitle;
    groupBtn.type = 'button';
    
    let groupName = document.createElement('div');
    groupName.className = 'group-name';
    groupName.textContent = groupTitle;
    
    groupBtn.append(groupName, deleteIcon('delete-group'));
    groups.append(groupBtn);
}

let addGroup = document.querySelector('.add-group');
addGroup.addEventListener('click', () => {
    document.querySelector('.group-dialog form').reset();
    document.querySelector('.group-dialog').showModal();
});

let addGroupEntry = document.querySelector('.group-dialog .add');
addGroupEntry.addEventListener('click', (e) => {
    e.preventDefault();

    let title = document.getElementById('title').value;
    groupsArr.push(new Group(title));

    displayGroup(groupsArr.length - 1, title);
    displayTaskPage(groupsArr.length - 1);

    document.querySelector('.group-dialog').close();
});

let cancelGroupEntry = document.querySelector('.group-dialog .cancel');
cancelGroupEntry.addEventListener('click', () => {
    document.querySelector('.group-dialog').close();
});

export { displayGroup };