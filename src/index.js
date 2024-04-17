import './style.css';

// FOR TEMPLATE HTML

// Delete tasks listeners
let deleteBtns = document.querySelectorAll('.delete');
deleteBtns.forEach((btn) =>
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
