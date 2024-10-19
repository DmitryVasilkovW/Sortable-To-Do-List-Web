let currentTab = 0;
let tags = [];

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
});

function switchTab(tabIndex) {
    document.getElementById(`list-${currentTab}`).style.display = 'none';
    currentTab = tabIndex;
    document.getElementById(`list-${currentTab}`).style.display = 'block';
}

function addTask(listIndex) {
    const taskInput = document.getElementById(`task-input-${listIndex}`).value;
    if (taskInput) {
        const taskList = document.getElementById(`task-list-${listIndex}`);
        const li = document.createElement('li');
        li.textContent = taskInput;
        taskList.appendChild(li);
        document.getElementById(`task-input-${listIndex}`).value = '';
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    // Тогглим (переключаем) состояние меню
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
    tagList.innerHTML = '';
    tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        tagList.appendChild(li);
    });
}
