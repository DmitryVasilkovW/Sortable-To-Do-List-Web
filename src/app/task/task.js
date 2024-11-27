function addTask(tabIndex) {
    const taskInput = document.getElementById(`task-input-${tabIndex}`);
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const li = document.createElement('li');
        li.textContent = taskValue;

        const menuButton = createMenuButton(li, tabIndex);

        li.appendChild(menuButton);
        taskList.appendChild(li);

        if (!todoListsData[tabIndex]) {
            todoListsData[tabIndex] = [];
        }
        todoListsData[tabIndex].push({ text: taskValue, tags: [] });

        taskInput.value = '';
    } else {
        alert('Please enter a task');
    }
}

function updateTaskDisplay(taskElement, taskData) {
    taskElement.innerHTML = '';
    taskElement.textContent = taskData.text;

    if (taskData.tags.length > 0) {
        const tagsContainer = document.createElement('span');
        tagsContainer.classList.add('task-tags');
        tagsContainer.textContent = `Tags: ${taskData.tags.join(', ')}`;
        taskElement.appendChild(tagsContainer);
    }

    const menuButton = createMenuButton(taskElement, taskData.tabIndex);
    taskElement.appendChild(menuButton);
}

function saveTasks(tabIndex) {
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    const tasks = [];
    
    taskList.querySelectorAll('.menu-button').forEach(button => button.remove());
    taskList.querySelectorAll('li').forEach(li => tasks.push(li.textContent));

    todoListsData[tabIndex] = tasks;
}

function loadTasks(tabIndex) {
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    taskList.innerHTML = '';

    todoListsData[tabIndex].forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        const menuButton = createMenuButton(li, tabIndex);
        li.appendChild(menuButton);
        
        taskList.appendChild(li);
    });
}
