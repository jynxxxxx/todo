import {DisplayTasks} from './tasks';
import {DisplayCategories} from './categories';


function EditTask(event) {
    const clickedButton = event.target;

    const taskToEditIndex = parseInt(clickedButton.getAttribute('data-task-index'));

    const tasksJSON = localStorage.getItem('tasks');
    const tasks = JSON.parse(tasksJSON) || [];

    // Find the task by its index property
    const taskToEdit = tasks.find(task => task.index === taskToEditIndex);

    const formcontainer = document.querySelector('.formcontainer');

    // Create the edit form and pre-fill it with task data
    const editForm = document.createElement('form');
    formcontainer.appendChild(editForm);

    editForm.innerHTML = `
        <ul class="input">
        <li><input type="text" id="editedTitle" value="${taskToEdit.title}"></li>
        <li><textarea id="editedDescription">${taskToEdit.description}</textarea></li>
        <li><input type="date" id="editedDate" value="${taskToEdit.date}"></li>
        </ul>
        <input type="radio" name="taskPriority" class="high priority" value="high" ${taskToEdit.priority === 'high' ? 'checked' : ''}>High
        <input type="radio" name="taskPriority" class="medium priority" value="medium" ${taskToEdit.priority === 'medium' ? 'checked' : ''}>Medium
        <input type="radio" name="taskPriority" class="low priority" value="low" ${taskToEdit.priority === 'low' ? 'checked' : ''}>Low
        <select id="editedDropdown" name="taskCategory"><option value="Default">Default</option></select>
        <button type="submit" id="saveEdit">Save Changes</button>
    `;


    // Retrieve data from localStorage
    const existingCategories = JSON.parse(localStorage.getItem('category')) || [];
    const selectCategory = editForm.querySelector('#editedDropdown');

    // Loop through the existingCategories and create options
    for (let i = 0; i < existingCategories.length; i++) {
        const option = document.createElement('option');
        option.value = existingCategories[i].title;
        option.text = existingCategories[i].title;

        // Set selected category in the dropdown
        if (taskToEdit.category === existingCategories[i].title) {
            option.selected = true;
        }

        // Append the option to the select element
        selectCategory.appendChild(option);
    }


    // Handle save button click
    document.getElementById('saveEdit').addEventListener('click', function() {
        // Update task data with edited values
        taskToEdit.title = document.getElementById('editedTitle').value;
        taskToEdit.description = document.getElementById('editedDescription').value;
        taskToEdit.date = document.getElementById('editedDate').value;
        taskToEdit.priority = document.querySelector('input[name="taskPriority"]:checked').value;
        taskToEdit.category = selectCategory.value;

        // Update tasks array in localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        DisplayTasks();
        overlay.style.display = 'none';
    });
}



function EditCategory(event) {
    const clickedButton = event.target;

    const editButtons = document.querySelectorAll('.editiconc');
    const editButtonsArray = Array.from(editButtons);
    const categoryToEditIndex = editButtonsArray.indexOf(clickedButton);

    const categoryJSON = localStorage.getItem('category');
    const categories = JSON.parse(categoryJSON) || [];

    const categoryToEdit = categories[categoryToEditIndex];
    const formcontainer = document.querySelector('.formcontainer');

    // Create the edit form and pre-fill it with category data
    const editForm = document.createElement('form');
    formcontainer.appendChild(editForm);

    editForm.innerHTML = `
        <ul class="input">
            <li><input type="text" id="editedCategory" value="${categoryToEdit.title}" required></li>
        </ul>
        <button type="submit" id="saveCat">Update Category</button>
    `;

    document.getElementById('saveCat').addEventListener('click', function(event) {
        const tasksJSON = localStorage.getItem('tasks');
        const tasks = JSON.parse(tasksJSON) || [];

        tasks.forEach(task => {
            if (task.category == categoryToEdit.title) {
                task.category = document.getElementById('editedCategory').value;
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));

        categoryToEdit.title = document.getElementById('editedCategory').value;
        localStorage.setItem('category', JSON.stringify(categories)); 


        // Update Task and Category Displays
        DisplayCategories();
        DisplayTasks();
        overlay.style.display = 'none';
    });
}


function DeleteTask(event) {
    const clickedButton = event.target;

    const taskToTrashIndex = parseInt(clickedButton.getAttribute('data-task-index'));
    console.log(taskToTrashIndex);
    
    const tasksJSON = localStorage.getItem('tasks');
    const tasks = JSON.parse(tasksJSON) || [];
    
    // Find the index of the task with the given index
    const taskIndexToDelete = tasks.findIndex(task => task.index === taskToTrashIndex);


    // Delete the task with the given index
    tasks.splice(taskIndexToDelete, 1);

    // Update the indices of the remaining tasks and associated button attributes
    tasks.forEach((task, index) => {
        task.index = index;

        const editButton = document.querySelector(`[data-task-index="${taskToTrashIndex}"].editicont`);
        if (editButton) {
            editButton.setAttribute('data-task-index', index);
        }
        
        const trashButton = document.querySelector(`[data-task-index="${taskToTrashIndex}"].trashicont`);
        if (trashButton) {
            trashButton.setAttribute('data-task-index', index);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    DisplayTasks();
}


function DeleteCategory(event) {
    const clickedButton = event.target;

    const categoryJSON = localStorage.getItem('category');
    const categories = JSON.parse(categoryJSON) || [];

    const trashButtons = document.querySelectorAll('.trashiconc');
    const trashButtonsArray = Array.from(trashButtons);
    const categoryToTrashIndex = trashButtonsArray.indexOf(clickedButton);
    const categoryToTrash = categories[categoryToTrashIndex];


    // update TaskCard Category
    const tasksJSON = localStorage.getItem('tasks');
    const tasks = JSON.parse(tasksJSON) || [];

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].category === categoryToTrash.title) {
            tasks[i].category = "Default";
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    categories.splice(categoryToTrashIndex, 1);

    localStorage.setItem('category', JSON.stringify(categories)); 

    DisplayCategories();
    DisplayTasks();
}

function TaskDone(event) {
    const container = document.querySelector('.content');
    const checkbox = event.target;
    const taskCard = checkbox.closest('.taskcards');
    const taskIndex = Array.from(container.children).indexOf(taskCard);
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Update checkbox status in existingTasks
    existingTasks[taskIndex].checked = checkbox.checked;

    // Update classList based on checkbox status
    if (checkbox.checked) {
        taskCard.classList.add('complete');
        taskCard.classList.remove('incomplete');
        console.log('task done');
    } else {
        taskCard.classList.add('incomplete');
        taskCard.classList.remove('complete');
        console.log('task not done');
    }

    // Update tasks array in localStorage
    localStorage.setItem('tasks', JSON.stringify(existingTasks));
}



export {EditTask, EditCategory, DeleteTask, DeleteCategory, TaskDone}