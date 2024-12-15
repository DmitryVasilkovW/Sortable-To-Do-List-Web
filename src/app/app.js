let todoListsData = loadTodoListsData();

document.addEventListener('DOMContentLoaded', function () {
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
    renderAllData()

    renderTags();
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

function saveTodoListsData() {
    localStorage.setItem('todoListsData', JSON.stringify(todoListsData));
}

function loadTodoListsData() {
    const savedData = localStorage.getItem('todoListsData') || "[]";
    return JSON.parse(savedData);
}

function renderAllData() {
    if (todoListsData.length === 0) {
        addNewTab();
    } else {
        todoListsData = loadTodoListsData()
        todoListsData.forEach((tabData, i) => {
            addNewTab(i)
            tabData.forEach(taskData => {
                renderTask(taskData, i);
            })
        })
    }
}