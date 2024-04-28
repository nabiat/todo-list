import './style.css';
import { Group } from './modules/group';
import { groupsArr, display, displayGroup } from "./modules/group-display-logic";

// autoselect default group on page load
// select one group at a time
// only accept valid date input
// clean/factor out code
// fix styling

display(0);

let groupEntry = document.querySelector('.add-group');
groupEntry.addEventListener('click', () => {
    document.querySelector('.group-dialog form').reset();
    document.querySelector('.group-dialog').showModal();
});

let addGroupEntry = document.querySelector('.group-dialog .add');
addGroupEntry.addEventListener('click', (e) => {
    e.preventDefault();

    let title = document.getElementById('title').value;
    groupsArr.push(new Group(title));
    displayGroup(groupsArr.length - 1, title);

    document.querySelector('.group-dialog').close();
});

let cancelGroupEntry = document.querySelector('.group-dialog .cancel');
cancelGroupEntry.addEventListener('click', () => {
    document.querySelector('.group-dialog').close();
});