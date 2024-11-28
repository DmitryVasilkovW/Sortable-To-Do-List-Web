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
    let taskText = taskElement.querySelector('.task-text');
    if (!taskText) {
        taskText = document.createElement('p');
        taskText.classList.add('task-text');
        taskElement.appendChild(taskText);
    }
    taskText.textContent = taskData.text;

    let tagsContainer = taskElement.querySelector('.tags-container');
    if (!tagsContainer) {
        tagsContainer = document.createElement('div');
        tagsContainer.classList.add('tags-container');
        taskElement.appendChild(tagsContainer);
    }

    tagsContainer.innerHTML = '';
    const taskTags = document.createElement('p');
    taskTags.classList.add('task-tags');
    taskTags.textContent = `Tags: ${taskData.tags.join(', ')}`;
    tagsContainer.appendChild(taskTags);
}

function saveTasks(tabIndex) {
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    const tasks = [];

    taskList.querySelectorAll('.menu-button').forEach(button => button.remove());

    taskList.querySelectorAll('li').forEach(li => {
        const text = li.querySelector('.task-text')?.textContent || '';

        const tagsContainer = li.querySelector('.task-tags');
        const tags = tagsContainer
            ? tagsContainer.textContent.replace('Tags: ', '').split(', ').filter(tag => tag)
            : [];

        tasks.push({ text, tags });
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

        const tagsContainer = document.createElement('div');
        tagsContainer.classList.add('tags-container');
        showTags(tagsContainer, task.tags);
        li.appendChild(tagsContainer);

        taskList.appendChild(li);
    });
}

function showTags(container, tags) {
    container.innerHTML = '';

    if (tags.length > 0) {
        const tagsList = document.createElement('span');
        tagsList.classList.add('task-tags');
        tagsList.textContent = 'Tags: ' + tags.join(', ');
        container.appendChild(tagsList);
    }
}
