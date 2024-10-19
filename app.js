let tasks = [];
let sortTags = [];

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

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    if (sortTags.length > 0) {
        tasks.sort((a, b) => {
            const aMatches = sortTags.filter(tag => a.tags.includes(tag)).length;
            const bMatches = sortTags.filter(tag => b.tags.includes(tag)).length;
            return bMatches - aMatches;
        });
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.task} (Теги: ${task.tags.join(', ')})`;
        taskList.appendChild(li);
    });
}

function renderTagFilters() {
    const tagFilters = document.getElementById('tag-filters');
    tagFilters.innerHTML = '';

    const allTags = [...new Set(tasks.flatMap(task => task.tags))];
    allTags.forEach(tag => {
        const button = document.createElement('button');
        button.textContent = tag;
        button.className = sortTags.includes(tag) ? 'active' : '';
        button.onclick = () => toggleSortTag(tag);
        tagFilters.appendChild(button);
    });
}

function toggleSortTag(tag) {
    if (sortTags.includes(tag)) {
        sortTags = sortTags.filter(f => f !== tag);
    } else {
        sortTags.push(tag);
    }
    renderTasks();
    renderTagFilters();
}

renderTasks();
renderTagFilters();
