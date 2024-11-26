let currentTab = 0;
let tags = [];
let tabs = 0;
let todoListsData = [];

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    const isSidebarOpen = localStorage.getItem('sidebarOpen') === 'true';

    if (isSidebarOpen) {
        sidebar.classList.add('open');
        mainContent.style.marginLeft = '250px';
    } else {
        sidebar.classList.remove('open');
        mainContent.style.marginLeft = '0';
    }

    renderTags();
    addNewTab();
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    sidebar.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        mainContent.style.marginLeft = '250px';
        localStorage.setItem('sidebarOpen', 'true');
    } else {
        mainContent.style.marginLeft = '0';
        localStorage.setItem('sidebarOpen', 'false');
    }
}

function addTag() {
    const newTagInput = document.getElementById('new-tag-input').value;
    if (newTagInput) {
        tags.push(newTagInput);
        renderTags();
        document.getElementById('new-tag-input').value = '';
    }
}

function renderTags() {
    const tagList = document.getElementById('tag-list');
    const tagSelects = document.querySelectorAll('.tag-select');

    tagList.innerHTML = '';
    tagSelects.forEach(select => {
        select.innerHTML = '<option value="">Select a tag</option>';
    });

    tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        tagList.appendChild(li);

        tagSelects.forEach(select => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            select.appendChild(option);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    addNewTab();
});

function switchTab(tabIndex) {
    saveTasks(currentTab);

    document.querySelector('.tab.active')?.classList.remove('active');
    document.querySelector('.todo-list.active')?.classList.remove('active');

    document.getElementById(`tab-${tabIndex}`).classList.add('active');
    document.getElementById(`list-${tabIndex}`).classList.add('active');

    currentTab = tabIndex;
    loadTasks(tabIndex);
}

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


function addNewTab() {
    const tabsContainer = document.getElementById('tabs');
    const todoListsContainer = document.getElementById('todo-lists');
    const tabIndex = Object.keys(todoListsData).length;  // Номер новой вкладки

    const newTab = document.createElement('div');
    newTab.classList.add('tab');
    newTab.id = `tab-${tabIndex}`;
    newTab.textContent = `Sheet ${tabIndex + 1}`;
    newTab.onclick = () => switchTab(tabIndex);
    tabsContainer.appendChild(newTab);

    const newTodoList = document.createElement('div');
    newTodoList.classList.add('todo-list');
    newTodoList.id = `list-${tabIndex}`;
    newTodoList.innerHTML = `
        <input type="text" id="task-input-${tabIndex}" placeholder="Add a task">
        <button id="add-task-btn-${tabIndex}">Add Task</button>
        <ul id="task-list-${tabIndex}"></ul>
    `;
    todoListsContainer.appendChild(newTodoList);

    todoListsData[tabIndex] = [];

    if (tabIndex === 0) {
        newTab.classList.add('active');
        newTodoList.classList.add('active');
    }

    document.getElementById(`add-task-btn-${tabIndex}`).onclick = () => addTask(tabIndex);
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
