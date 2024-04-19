import '../style.css';
import { groupsArr } from './default-group';
import upArrow from '../icons/arrow-up.svg';
import checkMark from '../icons/check-outline.svg';

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

function noteIcon() {
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

function editIcon(groupIndex, classCategory) {
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

function deleteIcon(classCategory) {
    let dlt = document.createElement('input');
    dlt.src = './icons/delete-outline.svg';
    dlt.className = classCategory;
    dlt.type = 'image';

    dlt.addEventListener('click', (e) => {
        e.preventDefault();

        if (dlt.className === 'delete-group') {
            // document.getElementById(`gindex-${gIndex}`).remove();
            return;
        } else deleteTask(dlt);
    });
    return dlt;
}

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

export { title, dueDate, editIcon, noteIcon, deleteIcon };