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

        todoListsData[tabIndex].push(taskValue);

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
    deleteOption.textContent = 'remove task';
    deleteOption.classList.add('delete-option');

    deleteOption.onclick = () => {
        deleteTask(taskElement, tabIndex);
        contextMenu.remove();
    };

    contextMenu.appendChild(deleteOption);

    document.body.appendChild(contextMenu);
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;

    document.addEventListener('click', function closeMenu(event) {
        if (!contextMenu.contains(event.target)) {
            contextMenu.remove();
            document.removeEventListener('click', closeMenu);
        }
    });
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