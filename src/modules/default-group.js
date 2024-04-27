import '../style.css';
import { ToDo } from "./todo";
import { Group } from "./group";
import { editIcon } from './icon-functionality';
import { createTask, addTaskBtn } from './create-add-tasks';

const groupsArr = [];

let defaultG = new Group('Home');
defaultG.addTask(new ToDo('Vacuum', 'hi', '2024-04-13', 'High', false));
defaultG.addTask(new ToDo('Laundry', '', '2024-04-13', 'Low', false));
defaultG.addTask(new ToDo('Organize', '', '2024-04-13', 'High', false));
defaultG.addTask(new ToDo('Clean bathrooms', '', '2024-04-13', 'Mid', false));

groupsArr.push(defaultG);

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

    let edit = editIcon(groupIndex, 'edit-title');

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

export { groupsArr };