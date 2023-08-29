import {CreateCategory, StoreCategories, DisplayCategories, CategoryTasks, DefaultTasks} from './categories';
import {PopUp, ClearPopUp} from './createOverlays';
import {CreateTask, StoreTask, DisplayTasks} from './tasks';
import {EditTask, EditCategory, DeleteTask, DeleteCategory, TaskDone} from './editDelete';
import {TodaysTasks} from './todaysTasks'
import {ThisWeeksTasks} from './weekTasks'


const container = document.querySelector('.content');
const addTask = document.querySelector('.addtask');
const addCategory = document.querySelector('.addcat');
const exit = document.querySelector('.exiticon');
const categoryContainer = document.querySelector('.categoryList');
const defaultCategory = document.querySelector('.default')
const home = document.querySelector('#home');
const todaysTask = document.querySelector('#today');
const weeksTask = document.querySelector('#thisweek');



document.addEventListener('DOMContentLoaded', () => {
    DisplayTasks();
    DisplayCategories();
});

addTask.addEventListener('click', ()=>{
    PopUp();
    CreateTask();
    StoreTask();
    DisplayTasks();
});

addCategory.addEventListener('click', ()=>{
    PopUp();
    CreateCategory();
    StoreCategories();
    DisplayCategories();

});

exit.addEventListener('click', ()=>{
    ClearPopUp();
});

container.addEventListener('click', function(event) {
    if (event.target.classList.contains('editicont')) {
        PopUp();
        EditTask(event);
    }
});

container.addEventListener('click', function(event) {
    if (event.target.classList.contains('trashicont')) {
        DeleteTask(event); 
    }
});

container.addEventListener('change', function(event) {
    if (event.target.classList.contains('checkbox')) {
        TaskDone(event);
    }
});

categoryContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('editiconc')) {
        PopUp();
        EditCategory(event); 
    }
});

categoryContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('trashiconc')) {
        DeleteCategory(event); 
    }
});

todaysTask.addEventListener('click', ()=>{
    TodaysTasks();
});

weeksTask.addEventListener('click', ()=>{
    ThisWeeksTasks();
});

home.addEventListener('click', () =>{
    const pageTitle = document.querySelector('.pagetitle');
    pageTitle.textContent="All Tasks";
    DisplayTasks();
});

categoryContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('category')) {
        CategoryTasks(event);
    }
});

defaultCategory.addEventListener('click', ()=>{
    DefaultTasks();
})