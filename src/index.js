import './style.css';
import { Group } from './modules/group';
import { groupsArr, displayGroupAndPage } from "./modules/group-display-logic";

// select one group + display page one at a time
// clean/factor out code
// fix styling

displayGroupAndPage(0, groupsArr[0].groupTitle);

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

    displayGroupAndPage(groupsArr.length - 1, title);

    document.querySelector('.group-dialog').close();

});

let cancelGroupEntry = document.querySelector('.group-dialog .cancel');
cancelGroupEntry.addEventListener('click', () => {
    document.querySelector('.group-dialog').close();
});