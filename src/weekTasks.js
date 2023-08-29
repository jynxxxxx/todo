import {CreateTaskCard} from './tasks';

function ThisWeeksTasks() {
    const container = document.querySelector('.content');
    container.innerHTML = "";

    const pageTitle = document.querySelector('.pagetitle');
    pageTitle.textContent="This Week's Tasks";
 
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Set to the first day of the week (Sunday)

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() - today.getDay() + 6); // Set to the last day of the week (Saturday)
    endOfWeek.setHours(23, 59, 59, 999); // Set time to end of the day

    const filteredTasks = existingTasks.filter(task => {
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison
        return taskDate >= startOfWeek && taskDate <= endOfWeek; // Compare task date within the week range
    });

    filteredTasks.forEach(task => {
        CreateTaskCard(task)
    }); 
}

export{ThisWeeksTasks}
