import './style.css';
import { ToDo } from './todo';
import { Group } from './group';
import upArrow from './icons/arrow-up.svg';
import checkMark from './icons/check-outline.svg';
import downArrow from './icons/arrow-down.svg';
import deleteOutline from './icons/delete-outline.svg';
import editOutline from './icons/pencil-outline.svg';

function LogicController() {
    const data = [];

    const getData = () => data;
    
    const addGroup = (title) => data.push(new Group(title));

    const addTask = (groupIndex, name, notes, due, priority, status) => {
        const newTask = new ToDo(name, notes, due, priority, status);
        getGroup(groupIndex).addTask(newTask);
        return newTask;
    };

    const removeGroup = (groupIndex) => data.splice(groupIndex, 1);

    const removeTask = (groupIndex, taskIndex) => {
        getGroup(groupIndex).removeTask(taskIndex);
    };

    const getGroup = (groupIndex) => data[groupIndex];

    const getTasks = (groupIndex) => getGroup(groupIndex).groupTasks;

    const getGroupTitle = (groupIndex) => getGroup(groupIndex).groupTitle;

    const getTask = (groupIndex, taskIndex) => {
        return getGroup(groupIndex).getTask(taskIndex);
    };

    const getNote = (groupIndex, taskIndex) => {
        return getTask(groupIndex, taskIndex).taskNote;
    };

    const changeStatus = (groupIndex, taskIndex, newStatus) => {
        getTask(groupIndex, taskIndex).updateStatus(newStatus);
    };

    const changeGroupTitle = (groupIndex, newTitle) => {
        getGroup(groupIndex).updateTitle(newTitle);
    };

    const changeTaskTitle = (groupIndex, taskIndex, newTitle) => {
        getTask(groupIndex, taskIndex).updateTitle(newTitle);
    };

    const changeDue = (groupIndex, taskIndex, newDate) => {
        getTask(groupIndex, taskIndex).updateDue(newDate);
    };

    const changeNote = (groupIndex, taskIndex, newNote) => {
        getTask(groupIndex, taskIndex).updateNotes(newNote);
    };

    const changePriority = (groupIndex, taskIndex, newPriority) => {
        getTask(groupIndex, taskIndex).updatePriority(newPriority);
    };

    return {getData, addGroup, addTask, removeGroup, removeTask, 
        getGroup, getTasks, getGroupTitle, getTask, getNote, 
        changeStatus, changeGroupTitle, changeTaskTitle, changeDue, 
        changeNote, changePriority};
}

function ScreenController() {
    const information = LogicController();
    const addGroupDialog = document.querySelector('.add-group');
    
    const addGroup = document.querySelector('.group-dialog .add');
    const addTask = document.querySelector('.task-dialog .add');
    const cancelGroupDialog = document.querySelector('.group-dialog .cancel');
    const cancelTaskDialog = document.querySelector('.task-dialog .cancel');

    const load = () => {
        if (!localStorage.getItem('groups')) {
            // Default group + tasks
            information.addGroup("Home");
            information.addTask(0, 'Vacuum', '', '2024-04-13', 'High', false);
            information.addTask(0, 'Laundry', '', '2024-04-13', 'Low', false);
            information.addTask(0, 'Organize', '', '2024-04-13', 'High', false);
            information.addTask(0, 'Clean bathrooms', '', '2024-04-13', 'Mid', false);

            updateGroup(0, information.getGroupTitle(0));
            localStorage.setItem('groups', JSON.stringify(information.getData()));

            updateTasks(0);
            document.querySelector('.groups').childNodes[0].style.backgroundColor = 'grey';
        } else {
            const groups = JSON.parse(localStorage.getItem('groups'));
            for (let i = 0; i < groups.length; i++) {
                updateGroup(i, groups[i].title);
                information.addGroup(groups[i].title);
                
                const tasks = groups[i].tasks;
                for (let j = 0; j < tasks.length; j++) {
                    const task = tasks[j];

                    information.addTask(i, task.title, task.note, task.due, 
                        task.priority, task.status);
                }
            }

            if (groups.length > 0) {
                updateTasks(0);
                document.querySelector('.groups').childNodes[0].style.backgroundColor = 'grey';
            }
        }
    }

    const updateGroup = (groupIndex, title) => {
        let groups = document.querySelector('.groups');

        // create button
        let groupBtn = document.createElement('button');
        groupBtn.id = 'gindex-' + groupIndex;
        groupBtn.dataset.index = groupIndex;
        groupBtn.className = 'group';
        groupBtn.value = title;
        groupBtn.type = 'button';
        
        let groupName = document.createElement('div');
        groupName.className = 'group-name';
        groupName.textContent = title;
        
        groupBtn.append(groupName, deleteIcon('delete-group'));
        groups.append(groupBtn);
    };

    const updateTasks = (groupIndex) => {
        let groupTasks = information.getTasks(groupIndex);
        let groupTitle = information.getGroupTitle(groupIndex);

        let rightPage = document.querySelector('.right');
        rightPage.innerHTML = '';
        rightPage.id = 'gindex-' + groupIndex;

        // Header
        let header = document.createElement('div');
        header.dataset.gIndex = groupIndex;
        header.className = 'right-header';

        let title = document.createElement('input');
        title.value = groupTitle;
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
        
        for (let i = 0; i < groupTasks.length; i++) {
            let task = groupTasks[i];
            let newTask = createTask(task, groupIndex, i);
            tasksDiv.append(newTask);

            if (task.taskStatus) {
                newTask.style.backgroundColor = 'grey';
                newTask.querySelector('.check').checked = true;
            }
        }

        rightPage.append(header, tasksDiv, addTaskDiv);
    };

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
    
        leftSide.append(checkBox(), title(task.taskTitle), noteIcon(), priority(task.taskPriority));
    
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

    // Inputs + their listeners
    function title(taskTitle) {
        let name = document.createElement('input');
        name.className = 'task-name';
        name.value = taskTitle;
        name.disabled = true;
        name.type = 'text';
        return name;
    }
    
    function dueDate(dueDate) {
        let due = document.createElement('input');
        due.className = 'task-due';
        due.value = dueDate;
        due.disabled = true;
        due.type = 'date';
        return due;
    }
    
    function textArea(taskNote) {
        let textArea = document.createElement('textarea');
        textArea.className = 'display-note';
        textArea.value = taskNote;
        textArea.disabled = true;
        return textArea;
    }
    
    function noteIcon() {
        let note = document.createElement('input');
        note.src = downArrow;
        note.className = 'note';
        note.type = 'image';
    
        note.addEventListener('click', (e) => {
            e.preventDefault();
    
            let currTask = note.parentNode.parentNode.parentNode;
            if (note.src === upArrow) {
                
                currTask.querySelector('.display-note').remove();
                note.src = downArrow;
    
            } else {
                let groupIndex = currTask.dataset.gIndex;
                let taskIndex = currTask.dataset.tIndex;
    
                let noteDiv = document.createElement('div');
                noteDiv.className = 'note-div';
                currTask.append(noteDiv);
    
                const noteData = information.getNote(groupIndex, taskIndex);
                noteDiv.append(textArea(noteData));
    
                note.src = upArrow;
            }
            
        });
        return note;
    }
    
    function priority(taskPriority) {
        let priority = document.createElement('select');
        priority.className = 'taskPriority';
        priority.disabled = true;
    
        let low = document.createElement('option');
        low.textContent = 'Low';
        low.value = 'low';
    
        let mid = document.createElement('option');
        mid.textContent = 'Mid';
        mid.value = 'mid';
    
        let high = document.createElement('option');
        high.textContent = 'High';
        high.value = 'high';
    
        if (taskPriority === 'low') {
            low.selected = true;
        } else if (taskPriority === 'mid') {
            mid.selected = true;
        } else {
            high.selected = true;
        }
    
        priority.append(low, mid, high);
    
        return priority;
    }
    
    function checkBox() {
        let checkMark = document.createElement('input');
        checkMark.className = 'check';
        checkMark.type = 'checkbox';
    
        checkMark.addEventListener('click', (e) => {
            let currTask = checkMark.parentNode.parentNode.parentNode;
            let taskIdx = currTask.dataset.tIndex;
            let groupIdx = currTask.dataset.gIndex;
    
    
            if (checkMark.checked) {
                information.changeStatus(groupIdx, taskIdx, true);
                currTask.style.backgroundColor = 'grey';
            } else {
                information.changeStatus(groupIdx, taskIdx, false);
                currTask.style.backgroundColor = 'transparent';
            }
            localStorage.setItem('groups', JSON.stringify(information.getData()));
        });
    
        return checkMark;
    }
    
    function editIcon(groupIndex, classCategory) {
        let edit = document.createElement('input');
        edit.src = editOutline;
        edit.dataset.index = groupIndex;
        edit.className = classCategory;
        edit.type = 'image';
    
        edit.addEventListener('click', (e) => {
            e.preventDefault();
            if (edit.className === 'edit-title') {
                editGroup(edit);
            } else {
                editTask(edit);
            }
        });
        return edit;
    }
    
    function editGroup(editBtn) {
        let pageHeader = editBtn.parentNode;
        if (pageHeader.querySelector('.edit-title').src === checkMark) {
            pageHeader.querySelector('.group-name').disabled = true;
    
            let groupIndex = pageHeader.dataset.gIndex;
            let newTitle = pageHeader.querySelector('.group-name').value;
    
            information.changeGroupTitle(groupIndex, newTitle);
    
            pageHeader.querySelector('.edit-title').src = editOutline;
            
            let group = document.getElementById(`gindex-${groupIndex}`);
            group.querySelector('.group-name').textContent = newTitle;

            localStorage.setItem('groups', JSON.stringify(information.getData()));
        } else {
            pageHeader.querySelector('.group-name').disabled = false;
            pageHeader.querySelector('.edit-title').src = checkMark;
        }
    }
    
    function editTask(editBtn) {
        let currTask = editBtn.parentNode.parentNode.parentNode;
        if (currTask.querySelector('.edit').src === checkMark) {
            let taskIndex = currTask.dataset.tIndex;
            let groupIndex = currTask.dataset.gIndex;
            
            disableInputs(currTask, true);
    
            information.changeTaskTitle(groupIndex, taskIndex, currTask.querySelector('.task-name').value);
            information.changeDue(groupIndex, taskIndex, currTask.querySelector('.task-due').value);
            information.changeNote(groupIndex, taskIndex, currTask.querySelector('.display-note').value);
    
            let dropdown = currTask.querySelector('.taskPriority');
            information.changePriority(groupIndex, taskIndex, dropdown.options[dropdown.selectedIndex].text);
    
            currTask.querySelector('.edit').src = editOutline;
    
            // close note if arrow down
            if (currTask.querySelector('.note').src !== upArrow) {
                currTask.querySelector('.display-note').remove();
            }

            localStorage.setItem('groups', JSON.stringify(information.getData()));
        } else {
            let groupIndex = currTask.dataset.gIndex;
            let taskIndex = currTask.dataset.tIndex;
    
            // show note if arrow is down
            if (currTask.querySelector('.note').src !== upArrow) {
                let noteDiv = document.createElement('div');
                currTask.append(noteDiv);
    
                let noteArea = textArea(information.getNote(groupIndex, taskIndex));
                noteDiv.append(noteArea);
            }
    
            currTask.querySelector('.edit').src = checkMark;
            disableInputs(currTask, false);
        }
    }
    
    function disableInputs(currTask, flag) {
        currTask.querySelector('.task-due').disabled = flag;
        currTask.querySelector('.task-name').disabled = flag;
        currTask.querySelector('.display-note').disabled = flag;
        currTask.querySelector('.taskPriority').disabled = flag;
    }
    
    function deleteIcon(classCategory) {
        let dlt = document.createElement('input');
        dlt.src = deleteOutline;
        dlt.className = classCategory;
        dlt.type = 'image';
    
        dlt.addEventListener('click', (e) => {
            e.preventDefault();
    
            if (dlt.className === 'delete-group') {
                let rightPage = document.querySelector('.right');
                updateDeleteGroups(dlt, rightPage);
            } else {
                updateDeleteTasks(dlt);
            }
    
        });
        return dlt;
    }
    
    function updateDeleteGroups(deleteBtn, rightPage) {
        let group = deleteBtn.parentNode;
        let groupIndex = group.dataset.index;

        if (rightPage.id === `gindex-${groupIndex}`) {
            rightPage.innerHTML = '';
        }
    
        while (group.nextSibling) {
            let siblingGroup = group.nextSibling;
            let oldIndex = siblingGroup.dataset.index;
            let newIndex = oldIndex - 1;
    
            if (rightPage.id === `gindex-${oldIndex}`) {
                rightPage.id = 'gindex-' + newIndex;
            }
    
            siblingGroup.id = 'gindex-' + newIndex;
            siblingGroup.dataset.index = newIndex;
    
            group = siblingGroup;
        }

        information.removeGroup(groupIndex);

        localStorage.setItem('groups', JSON.stringify(information.getData()));

        deleteBtn.parentNode.remove();
    }
    
    function updateDeleteTasks(deleteBtn) {
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
    
        information.removeTask(currGroupIndex, currTaskIndex);

        localStorage.setItem('groups', JSON.stringify(information.getData()));

        deleteBtn.parentNode.parentNode.parentNode.remove();
    }

    // Listener for selecting groups
    document.body.addEventListener('click', (e) => {
        if (e.currentTarget !== e.target) {
            if (e.target.classList.contains('group')) {
                let idx = e.target.dataset.index;
                updateTasks(idx); 
    
                for (let child of e.target.parentNode.children) {
                    child.style.backgroundColor = 'transparent';
                }
    
                e.target.style.backgroundColor = 'grey';
            }
        }
    });

    // Listeners for Groups
    addGroupDialog.addEventListener('click', () => {
        document.querySelector('.group-dialog form').reset();
        document.querySelector('.group-dialog').showModal();
    });

    cancelGroupDialog.addEventListener('click', () => {
        document.querySelector('.group-dialog').close();
    });

    addGroup.addEventListener('click', (e) => {
        e.preventDefault();

        const data = information.getData();
        const title = document.getElementById('title').value;

        information.addGroup(title);
        updateGroup(data.length - 1, title);

        const newInfo = JSON.parse(localStorage.getItem('groups'));
        newInfo.push(data[data.length - 1]);
        localStorage.setItem('groups', JSON.stringify(newInfo));

        document.querySelector('.group-dialog').close();
    });

    // Listeners for Tasks
    function addTaskBtn(groupIndex) {
        let taskBtn = document.createElement('button');
        taskBtn.dataset.gIndex = groupIndex;
        taskBtn.textContent = 'Add Task';
        taskBtn.className = 'add-task';
    
        taskBtn.addEventListener('click', () => {
            document.querySelector('.task-dialog form').reset();
    
            let addTaskDialog = document.querySelector('.task-dialog');
            let addBtnInDialog = addTaskDialog.querySelector('.add');
            addBtnInDialog.dataset.gIndex = taskBtn.dataset.gIndex;
            addTaskDialog.showModal();
        });
    
        return taskBtn;
    }
    
    cancelTaskDialog.addEventListener('click', () => {
        let taskDialog = document.querySelector('.task-dialog');
        taskDialog.close();
    });

    addTask.addEventListener('click', (e) => {
        e.preventDefault();

        const groupIndex = addTask.dataset.gIndex;
        const name = document.getElementById('name').value;
        const due = document.getElementById('due').value;
        const note = document.getElementById('note').value;
        const priority = document.getElementById('priority').value;
        const newTask = information.addTask(groupIndex, name, note, due, priority);
        const taskIndex = information.getTasks(groupIndex).length - 1;

        document.querySelector('.tasks').append(createTask(newTask, groupIndex, taskIndex));

        localStorage.setItem('groups', JSON.stringify(information.getData()));

        document.querySelector('.task-dialog').close();
    });

    load();
}

ScreenController();