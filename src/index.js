import './style.css';
import { ToDo } from './modules/todo';
import { Group } from './modules/group';
import { displayGroup } from './modules/group-display-logic';
import { displayTaskPage } from './modules/task-display-logic';

const groupsArr = [];

let defaultG = new Group('Home');
defaultG.addTask(new ToDo('Vacuum', 'hi', '2024-04-13', 'High', false));
defaultG.addTask(new ToDo('Laundry', '', '2024-04-13', 'Low', false));
defaultG.addTask(new ToDo('Organize', '', '2024-04-13', 'High', false));
defaultG.addTask(new ToDo('Clean bathrooms', '', '2024-04-13', 'Mid', false));

groupsArr.push(defaultG);

displayGroup(0, groupsArr[0].groupTitle);
displayTaskPage(0);

// Display the selected groups tasks + highlight selected group
document.body.addEventListener('click', (e) => {
    if (e.currentTarget !== e.target) {
        if (e.target.classList.contains('group')) {
            let idx = e.target.dataset.index;
            displayTaskPage(idx);

            for (let child of e.target.parentNode.children) {
                child.style.backgroundColor = 'transparent';
            }

            e.target.style.backgroundColor = 'grey';
        }
    }
});

export { groupsArr };