let tasks = [];
let filters = [];

// Добавление новой задачи с тегами
function addTask() {
    const taskInput = document.getElementById('task-input').value;
    const tagInput = document.getElementById('tag-input').value.split(',').map(tag => tag.trim());

    if (taskInput && tagInput.length) {
        tasks.push({ task: taskInput, tags: tagInput });
        document.getElementById('task-input').value = '';
        document.getElementById('tag-input').value = '';
        renderTasks();
        renderTagFilters();
    }
}

// Отображение задач с учетом выбранных фильтров
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        return filters.every(filter => task.tags.includes(filter));
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.task} (Теги: ${task.tags.join(', ')})`;
        taskList.appendChild(li);
    });
}

// Отображение доступных тегов для фильтрации
function renderTagFilters() {
    const tagFilters = document.getElementById('tag-filters');
    tagFilters.innerHTML = '';

    const allTags = [...new Set(tasks.flatMap(task => task.tags))];
    allTags.forEach(tag => {
        const button = document.createElement('button');
        button.textContent = tag;
        button.className = filters.includes(tag) ? 'active' : '';
        button.onclick = () => toggleFilter(tag);
        tagFilters.appendChild(button);
    });
}

// Переключение фильтров по тегам
function toggleFilter(tag) {
    if (filters.includes(tag)) {
        filters = filters.filter(f => f !== tag);
    } else {
        filters.push(tag);
    }
    renderTasks();
    renderTagFilters();
}

// Инициализация
renderTasks();
renderTagFilters();
