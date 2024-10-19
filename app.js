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

    renderTags();
});

function switchTab(tabIndex) {
    document.getElementById(`list-${currentTab}`).style.display = 'none';
    currentTab = tabIndex;
    document.getElementById(`list-${currentTab}`).style.display = 'block';
}

function addTask(listIndex) {
    const taskInput = document.getElementById(`task-input-${listIndex}`).value;
    const tagSelect = document.getElementById(`tag-select-${listIndex}`);
    const selectedTag = tagSelect.value;

    if (taskInput) {
        const taskList = document.getElementById(`task-list-${listIndex}`);
        const li = document.createElement('li');
        li.textContent = taskInput + (selectedTag ? ` [${selectedTag}]` : '');
        taskList.appendChild(li);
        document.getElementById(`task-input-${listIndex}`).value = '';
        tagSelect.value = '';
    }
}

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
        select.innerHTML = '<option value="">Выберите тег</option>';
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
