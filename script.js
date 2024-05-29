function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = {
            text: taskText,
            addedAt: new Date().toLocaleString(),
            completedAt: null
        };
        const tasks = getTasksFromStorage();
        tasks.push(task);
        saveTasksToStorage(tasks);
        taskInput.value = '';
        renderTasks();
    }
}

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = getTasksFromStorage();
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.text} (Added: ${task.addedAt})`;

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        if (!task.completedAt) {
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.className = 'complete-btn';
            completeButton.onclick = () => completeTask(index);
            actions.appendChild(completeButton);

            pendingTasksList.appendChild(taskItem);
        } else {
            taskItem.className = 'completed';
            taskItem.textContent = `${task.text} (Added: ${task.addedAt}, Completed: ${task.completedAt})`;

            completedTasksList.appendChild(taskItem);
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = () => editTask(index);
        actions.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteTask(index);
        actions.appendChild(deleteButton);

        taskItem.appendChild(actions);
    });
}

function completeTask(index) {
    const tasks = getTasksFromStorage();
    tasks[index].completedAt = new Date().toLocaleString();
    saveTasksToStorage(tasks);
    renderTasks();
}

function editTask(index) {
    const newTaskText = prompt('Edit your task:', getTasksFromStorage()[index].text);
    if (newTaskText !== null) {
        const tasks = getTasksFromStorage();
        tasks[index].text = newTaskText.trim();
        saveTasksToStorage(tasks);
        renderTasks();
    }
}

function deleteTask(index) {
    const tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    renderTasks();
}

document.addEventListener('DOMContentLoaded', renderTasks);
