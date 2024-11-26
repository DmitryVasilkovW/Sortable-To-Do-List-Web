let currentTab = 0;

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