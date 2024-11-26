function addTask(tabIndex) {
    const taskInput = document.getElementById(`task-input-${tabIndex}`);
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const li = document.createElement('li');
        li.textContent = taskValue;

        // Создание кнопки меню с многоточием
        const menuButton = document.createElement('button');
        menuButton.textContent = '...';
        menuButton.classList.add('menu-button');

        // Добавляем обработчик для кнопки
        menuButton.onclick = (event) => {
            event.stopPropagation();  // чтобы не закрывалось меню при клике на задачу
            showContextMenu(event, li, tabIndex);  // Показываем меню
        };

        li.appendChild(menuButton);
        taskList.appendChild(li);

        todoListsData[tabIndex].push(taskValue);

        taskInput.value = '';
    } else {
        alert('Please enter a task');
    }
}

function showContextMenu(event, taskElement, tabIndex) {
    // Создаем меню
    const contextMenu = document.createElement('ul');
    contextMenu.classList.add('context-menu');

    // Создаем пункт меню для удаления
    const deleteOption = document.createElement('li');
    deleteOption.textContent = 'Удалить';
    deleteOption.classList.add('delete-option');

    deleteOption.onclick = () => {
        deleteTask(taskElement, tabIndex);
        contextMenu.remove();  // Убираем меню после действия
    };

    contextMenu.appendChild(deleteOption);

    // Позиционируем меню рядом с кнопкой
    document.body.appendChild(contextMenu);
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;

    // Закрыть меню, если кликнули вне меню
    document.addEventListener('click', function closeMenu(event) {
        if (!contextMenu.contains(event.target)) {
            contextMenu.remove();
            document.removeEventListener('click', closeMenu);
        }
    });
}

function deleteTask(taskElement, tabIndex) {
    // Удаляем задачу из DOM
    taskElement.remove();

    // Удаляем задачу из todoListsData
    const taskIndex = Array.from(taskElement.parentNode.children).indexOf(taskElement);
    todoListsData[tabIndex].splice(taskIndex, 1);  // Удаляем задачу по индексу
}

function saveTasks(tabIndex) {
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    const tasks = [];

    taskList.querySelectorAll('li').forEach(li => tasks.push(li.textContent));

    todoListsData[tabIndex] = tasks;
}

function loadTasks(tabIndex) {
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    taskList.innerHTML = '';

    todoListsData[tabIndex].forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });
}