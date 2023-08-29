import {CreateTaskCard} from './tasks';

function CreateCategory() {
    const formcontainer = document.querySelector('.formcontainer');

    let createCategory=document.createElement('div');
    createCategory.classList.add('createCategory');
    formcontainer.appendChild(createCategory);

    createCategory.innerHTML =
        '<form action="" method="get" id="categoryform">' +
        '    <ul class="input">' +
        '        <li><input type="text" id="title" placeholder="Title:" required></li>' +
        '    </ul>'+
        '    <button type="submit" form="categoryform" class="submitbtn">Add Category</button>' +
        '</form>';
};



function GetCategoryName(){
    const title = document.getElementById('title').value;

    const categoryName = {
        title: title
    };

    return categoryName;
}



function StoreCategories() {
    const categoryForm = document.getElementById('categoryform');

    categoryForm.addEventListener('submit', (e) => {
        const categoryName = GetCategoryName();

        const existingCategories = JSON.parse(localStorage.getItem('category')) || [];

        existingCategories.push(categoryName);

        localStorage.setItem('category', JSON.stringify(existingCategories));
    });
}

function DisplayCategories() {
    const categories = document.querySelector('.categoryList');
    
    categories.innerHTML = '';

    const existingCategories = JSON.parse(localStorage.getItem('category')) || [];

    existingCategories.forEach(category => {
        const categoryElement = document.createElement('li');
        categoryElement.classList.add('category');

        const categorytext = document.createElement('div');
        categorytext.classList.add('categorytext');

        const icons = document.createElement('div');
        icons.classList.add('icons');

        categorytext.innerHTML = 
            category.title;

        categoryElement.appendChild(categorytext)

        icons.innerHTML = 
            '<div class="edit">' +
            '     <object class="editiconc" data="./images/square-edit-outline.png"></object>' +
            '</div>' +
            '<div class="trash">' +
            '     <object class="trashiconc" data="./images/trash-can-outline.png"></object>' +
            '</div>';

        categoryElement.appendChild(icons);

        
        categories.appendChild(categoryElement);
    });
}

function CategoryTasks(event){
    const container = document.querySelector('.content');
    container.innerHTML = "";

    const pageTitle = document.querySelector('.pagetitle');
    pageTitle.textContent=`${event.target.innerText} Tasks`

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const filteredTasks = existingTasks.filter(task => task.category === event.target.innerText);

    filteredTasks.forEach((task) => {
        CreateTaskCard(task);
    });
}

function DefaultTasks(){
    const container = document.querySelector('.content');
    container.innerHTML = "";

    const pageTitle = document.querySelector('.pagetitle');
    pageTitle.textContent="Default Tasks";

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const filteredTasks = existingTasks.filter(task => task.category === 'Default');

    filteredTasks.forEach(task => {
        CreateTaskCard(task);
    });
}


export {CreateCategory, GetCategoryName, StoreCategories, DisplayCategories, CategoryTasks, DefaultTasks};

