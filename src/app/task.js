const activeContextElements = [];

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

function createMenuButton(taskElement, tabIndex) {
    const menuButton = document.createElement('button');
    menuButton.textContent = '...';
    menuButton.classList.add('menu-button');

    menuButton.onclick = (event) => {
        event.stopPropagation();
        showContextMenu(event, taskElement, tabIndex);
    };

    return menuButton;
}

function showContextMenu(event, taskElement, tabIndex) {
    const contextMenu = document.createElement('ul');
    contextMenu.classList.add('context-menu');

    const deleteOption = document.createElement('li');
    deleteOption.textContent = 'Remove task';
    deleteOption.classList.add('delete-option');
    deleteOption.onclick = () => {
        deleteTask(taskElement, tabIndex);
        contextMenu.remove();
        removeFromActiveElements(contextMenu);
    };
    contextMenu.appendChild(deleteOption);

    const addTagOption = document.createElement('li');
    addTagOption.textContent = 'Add Tag';
    addTagOption.classList.add('add-tag-option');
    addTagOption.onclick = () => {
        showTagSelector(taskElement, tabIndex);
        contextMenu.remove();
        removeFromActiveElements(contextMenu);
    };
    contextMenu.appendChild(addTagOption);

    document.body.appendChild(contextMenu);
    activeContextElements.push(contextMenu);

    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;

    document.addEventListener('click', function closeMenu(event) {
        if (!contextMenu.contains(event.target)) {
            closeAllContextElements();
            document.removeEventListener('click', closeMenu);
        }
    });
}

function closeAllContextElements(event) {
    const clickedInside = activeContextElements.some(element =>
        element.contains(event.target)
    );

    if (!clickedInside) {
        activeContextElements.forEach(element => element.remove());
        activeContextElements.length = 0; // Очищаем массив
    }
}


function removeFromActiveElements(element) {
    const index = activeContextElements.indexOf(element);
    if (index !== -1) {
        activeContextElements.splice(index, 1);
    }
}

function showTagSelector(taskElement, tabIndex) {
    const tagSelector = document.createElement('div');
    tagSelector.classList.add('tag-selector');
    tagSelector.innerHTML = `
        <label for="tag-select">Select a tag:</label>
        <select id="tag-select">
            <option value="">Select a tag</option>
            ${tags.map(tag => `<option value="${tag}">${tag}</option>`).join('')}
        </select>
        <button id="add-tag-button">Add</button>
    `;

    document.body.appendChild(tagSelector);
    activeContextElements.push(tagSelector);

    const rect = taskElement.getBoundingClientRect();
    tagSelector.style.left = `${rect.right + 10}px`;
    tagSelector.style.top = `${rect.top}px`;

    const addButton = tagSelector.querySelector('#add-tag-button');
    addButton.onclick = () => {
        const selectedTag = tagSelector.querySelector('#tag-select').value;
        if (selectedTag) {
            addTagToTask(taskElement, tabIndex, selectedTag);
        }
        tagSelector.remove();
        removeFromActiveElements(tagSelector);
    };
}

function addTagToTask(taskElement, tabIndex, tag) {
    const taskIndex = Array.from(taskElement.parentNode.children).indexOf(taskElement);
    const taskData = todoListsData[tabIndex][taskIndex];

    if (!taskData.tags.includes(tag)) {
        taskData.tags.push(tag);
        updateTaskDisplay(taskElement, taskData);
    } else {
        alert('Tag already added!');
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


function deleteTask(taskElement, tabIndex) {
    taskElement.remove();

    const taskIndex = Array.from(taskElement.parentNode.children).indexOf(taskElement);
    todoListsData[tabIndex].splice(taskIndex, 1);
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
