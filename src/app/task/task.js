function addTask(tabIndex) {
    const taskInput = document.getElementById(`task-input-${tabIndex}`);
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const li = createTask(taskValue, null, tabIndex)
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
    const li = createTask(taskData.text, taskData.tags, tabIndex)
    
    taskElement.replaceWith(li);
}

function saveTasks(tabIndex) {
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    const tasks = [];

    taskList.querySelectorAll('.menu-button').forEach(button => button.remove());

    taskList.querySelectorAll('li').forEach(li => {
        const text = li.querySelector('.task-text')?.textContent || '';

        const tagsContainer = li.querySelector('.task-tags');
        const tagString = tagsContainer ? tagsContainer.textContent.replace('Tags: ', '') : '';
        const tags = parseTags(tagString);

        tasks.push({ text, tags });
    });

    todoListsData[tabIndex] = tasks;
}

function loadTasks(tabIndex) {
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    taskList.innerHTML = '';

    todoListsData[tabIndex].forEach(task => {
        const li = createTask(task.text, task.tags, tabIndex)

        taskList.appendChild(li);
    });
}

function createTask(text, tags, tabIndex) {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = text;
    li.appendChild(taskText);

    const menuButton = createMenuButton(li, tabIndex);
    li.appendChild(menuButton);

    if (tags) {
        const tagsContainer = document.createElement('div');
        tagsContainer.classList.add('tags-container');
        showTags(tagsContainer, tags);
        li.appendChild(tagsContainer);
    }

   return li
}

function showTags(container, tags) {
    container.innerHTML = '';

    if (tags.length > 0) {
        const tagsList = document.createElement('span');
        tagsList.classList.add('task-tags');
        
        tagsList.textContent = 'Tags: ' + getTagsAsString(tags)
        container.appendChild(tagsList);
    }
}

function getTagsAsString(tags) {
    return tags.map(tag => tag.tag).join(', ');
}

function sortTasks(tabIndex) {
    const tasks = todoListsData[tabIndex];

    tasks.sort((a, b) => {
        const weightA = a.tags.reduce((sum, tag) => sum + tag.weight, 0);
        const weightB = b.tags.reduce((sum, tag) => sum + tag.weight, 0);
        return weightB - weightA;
    });

    loadTasks(tabIndex);
}
