function addTask(tabIndex) {
    const taskInput = document.getElementById(`task-input-${tabIndex}`);
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const li = document.createElement('li');

        const textElement = document.createElement('p');
        textElement.classList.add('task-text');
        textElement.textContent = taskValue;
        li.appendChild(textElement);

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

function updateTaskDisplay(taskElement, taskData, tabIndex) {
    taskElement.innerHTML = '';

    const taskRow = document.createElement('div');
    taskRow.classList.add('task-row');

    const textElement = document.createElement('p');
    textElement.classList.add('task-text');
    textElement.textContent = taskData.text;
    taskRow.appendChild(textElement);

    const menuButton = createMenuButton(taskElement, tabIndex);
    taskRow.appendChild(menuButton);

    taskElement.appendChild(taskRow);

    if (taskData.tags.length > 0) {
        const tagsContainer = document.createElement('span');
        tagsContainer.classList.add('task-tags');
        tagsContainer.textContent = `Tags: ${taskData.tags.join(', ')}`;
        taskElement.appendChild(tagsContainer);
    }
}


function saveTasks(tabIndex) {
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    const tasks = [];

    taskList.querySelectorAll('.menu-button').forEach(button => button.remove());

    taskList.querySelectorAll('li').forEach(li => {
        const text = li.querySelector('.task-text')?.textContent || '';
        const tags = Array.from(li.querySelectorAll('.task-tags')).map(tag => tag.textContent);

        tasks.push({text, tags});
    });

    todoListsData[tabIndex] = tasks;
}

function loadTasks(tabIndex) {
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    taskList.innerHTML = '';

    todoListsData[tabIndex].forEach(task => {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        li.appendChild(taskText);

        const menuButton = createMenuButton(li, tabIndex);
        li.appendChild(menuButton);

        task.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('task-tags');
            tagElement.textContent = tag.toString();
            li.appendChild(tagElement);
        });

        taskList.appendChild(li);
    });
}
