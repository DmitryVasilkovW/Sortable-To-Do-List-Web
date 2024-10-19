let currentTab = 0;
let tags = [];

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
    sidebar.classList.toggle('open');
    const mainContent = document.querySelector('.main-content');
    if (sidebar.classList.contains('open')) {
        mainContent.style.marginLeft = '250px';
    } else {
        mainContent.style.marginLeft = '0';
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
