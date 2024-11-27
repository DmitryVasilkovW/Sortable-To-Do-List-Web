let currentTab = 0;
let hoveredTabId = null;

document.addEventListener('keydown', (event) => {
    if ((event.key === 'Delete' || event.key === 'Backspace') && hoveredTabId !== null) {
        showDeleteConfirmation(hoveredTabId);
    }
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

function addNewTab() {
    const tabsContainer = document.getElementById('tabs');
    const todoListsContainer = document.getElementById('todo-lists');
    const tabIndex = Object.keys(todoListsData).length;

    const newTab = document.createElement('div');
    newTab.classList.add('tab');
    newTab.id = `tab-${tabIndex}`;
    newTab.textContent = `Sheet ${tabIndex + 1}`;
    newTab.onclick = () => switchTab(tabIndex);
    newTab.onmouseover = () => (hoveredTabId = tabIndex);
    newTab.onmouseout = () => (hoveredTabId = null);
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

function showDeleteConfirmation(tabIndex) {
    const confirmation = confirm(`Do you really want to delete tab ${tabIndex + 1}?`);
    if (confirmation) {
        deleteTab(tabIndex);
    }
}

function deleteTab(tabIndex) {
    document.getElementById(`tab-${tabIndex}`).remove();
    document.getElementById(`list-${tabIndex}`).remove();
    delete todoListsData[tabIndex];

    if (currentTab === tabIndex) {
        currentTab = 0;
        if (document.getElementById(`tab-0`)) {
            switchTab(0);
        }
    }
}
