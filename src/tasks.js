const container = document.querySelector('.content');

function CreateTask() {
    const formcontainer = document.querySelector('.formcontainer');
 
    let createTask = document.createElement('div');
    createTask.classList.add('createtask');
    
    formcontainer.appendChild(createTask);

    createTask.innerHTML =
        '<form action="" method="get" id="taskform">' +
        '    <ul class="input">' +
        '        <li><input type="text" id="title" placeholder="Title:" required></li>' +
        '        <li><textarea id="descrip" placeholder="Optional Description" maxlength="1000"></textarea></li>' +
        '        <li><input type="date" id="date"></li>' +
        '    </ul>' +
        '    <input type="radio" name="taskform" class="high priority" value="high" checked>High' +
        '    <input type="radio" name="taskform" class="medium priority" value="medium">Medium' +
        '    <input type="radio" name="taskform" class="low priority" value="low">Low' +
        '    <select id="categoryDropdown" name="taskform">' +
        '        <option value="Default">Default</option>'+
        '    </select>' +
        '    <button type="submit" form="taskform" class="submitbtn">Add Task</button>' +
        '</form>';

    // Retrieve data from localStorage
    const existingCategories = JSON.parse(localStorage.getItem('category')) || [];
    const selectCategory = createTask.querySelector('#categoryDropdown');

    // Loop through the existingCategories and create options
    for (let i = 0; i < existingCategories.length; i++) {
        const option = document.createElement('option');
        option.value = existingCategories[i].title;
        option.text = existingCategories[i].title;
        
        // Append the option to the select element
        selectCategory.appendChild(option);
    }
}


function GetTaskFormData() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('descrip').value;
    const date = document.getElementById('date').value;

    const priority = document.querySelectorAll('[name="taskform"]');
    let selectedPriority = null;
    for (const input of priority) {
        if (input.checked) {
            selectedPriority = input.value;
            break;
        }
    }

    const category = document.getElementById('categoryDropdown').value;

    let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    let taskIndex = existingTasks.length; 

    const taskData = {
        title: title,
        description: description,
        date: date,
        priority: selectedPriority,
        category: category, 
        checked: false,
        index: taskIndex,
    };

    return taskData;
}


function SortTasks(tasks) {
    return tasks.sort((a, b) => {
        const dateComparison = new Date(a.date) - new Date(b.date);

        if (dateComparison !== 0) {
            return dateComparison; // Sort by nearest date
        } else {
            const priorityOrder = {
                'high': 0,
                'medium': 1,
                'low': 2, 
            };
            return priorityOrder[a.priority] - priorityOrder[b.priority]; // Sort by priority
        }
    });
}

function StoreTask() {
    const taskForm = document.getElementById('taskform');

    taskForm.addEventListener('submit', (e) => {
      
        const taskData = GetTaskFormData();

        let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        existingTasks.push(taskData);

        existingTasks = SortTasks(existingTasks);

        localStorage.setItem('tasks', JSON.stringify(existingTasks));
    });
}


function DisplayTasks() {
   
    container.innerHTML = '';

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    existingTasks.forEach(task => {
        CreateTaskCard(task)
    }); 
}

function CreateTaskCard(task){
    const taskCard = document.createElement('div');
    taskCard.classList.add('taskcards');

    taskCard.innerHTML = `
        <input type="checkbox" class="checkbox" ${task.checked ? 'checked' : ''}>
        <div class="cardTitle"> ${task.title}</div>
        <div class="cardDate"> Due Date: ${task.date}</div>
        <div class="cardPriority"> Priority: ${task.priority}</div>
        <div class="cardCategory"> Category: ${task.category}</div>
        <div class="cardDescrip"> Details: ${task.description}</div>
        <div class="edit">
            <object class="editicont" data="./images/square-edit-outline.png"></object>
        </div>
        <div class="trash">
            <object class="trashicont" data="./images/trash-can-outline.png"></object>
        </div>`;
    
    const editButton = taskCard.querySelector('.editicont');
    editButton.setAttribute('data-task-index', task.index);

    const trashButton = taskCard.querySelector('.trashicont');
    trashButton.setAttribute('data-task-index', task.index);

    container.appendChild(taskCard);
}



export {CreateTask, GetTaskFormData, StoreTask, DisplayTasks, CreateTaskCard}