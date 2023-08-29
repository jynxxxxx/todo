import {CreateTaskCard} from './tasks';

function TodaysTasks() {
    const container = document.querySelector('.content');
    container.innerHTML = "";

    const pageTitle = document.querySelector('.pagetitle');
    pageTitle.textContent="Today's Tasks";

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
 
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredTasks = existingTasks.filter((task) => {
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
    });

    filteredTasks.forEach(task => {
        CreateTaskCard(task)
    }); 
}

export{TodaysTasks}