document.body.innerHTML = `
  <input id="task-input-0" value="Test task" />
  <ul id="task-list-0"></ul>
`;

function addTask(listId) {
    const taskInput = document.getElementById(`task-input-${listId}`);
    const taskList = document.getElementById(`task-list-${listId}`);
    const taskItem = document.createElement('li');
    const taskText = document.createElement('p');
    taskText.classList.add('task-text');
    taskText.textContent = taskInput.value;
    taskItem.appendChild(taskText);
    taskList.appendChild(taskItem);
}

function updateTaskDisplay(taskElement, taskData, listId) {
    const taskText = taskElement.querySelector('.task-text');
    taskText.textContent = taskData.text;

    const tagsContainer = taskElement.querySelector('.tags-container') || document.createElement('div');
    tagsContainer.classList.add('tags-container');
    const taskTags = document.createElement('p');
    taskTags.classList.add('task-tags');
    taskTags.textContent = `Tags: ${taskData.tags.join(', ')}`;
    tagsContainer.appendChild(taskTags);
    taskElement.appendChild(tagsContainer);
}

function saveTasks(listId) {
    const taskList = document.getElementById(`task-list-${listId}`);
    const tasks = Array.from(taskList.querySelectorAll('li')).map(task => ({
        text: task.querySelector('.task-text').textContent,
        tags: ['tag1', 'tag2']  // Просто для примера
    }));
    todoListsData[listId] = tasks;
}

function loadTasks(listId) {
    const taskList = document.getElementById(`task-list-${listId}`);
    todoListsData[listId].forEach(taskData => {
        const taskElement = document.createElement('li');
        updateTaskDisplay(taskElement, taskData, listId);
        taskList.appendChild(taskElement);
    });
}

function showTags(container, tags) {
    const taskTags = document.createElement('p');
    taskTags.classList.add('task-tags');
    taskTags.textContent = `Tags: ${tags.join(', ')}`;
    container.appendChild(taskTags);
}

let todoListsData = {};

describe('Task management functions', () => {
    let taskList;

    beforeEach(() => {
        taskList = document.getElementById('task-list-0');
    });

    test('addTask добавляет задачу в список', () => {
        addTask(0);

        const taskItems = taskList.querySelectorAll('li');
        expect(taskItems).toHaveLength(1);
        expect(taskItems[0].querySelector('.task-text').textContent).toBe('Test task');
    });

    test('updateTaskDisplay обновляет задачу', () => {
        const taskElement = document.createElement('li');
        const taskText = document.createElement('p');
        taskText.classList.add('task-text');
        taskElement.appendChild(taskText);

        const taskData = { text: 'Updated task', tags: ['tag1', 'tag2'] };

        updateTaskDisplay(taskElement, taskData, 0);

        expect(taskElement.querySelector('.task-text').textContent).toBe('Updated task');
        const tagsContainer = taskElement.querySelector('.tags-container');
        expect(tagsContainer.querySelector('.task-tags').textContent).toBe('Tags: tag1, tag2');
    });


    test('saveTasks сохраняет задачи', () => {
        taskList.innerHTML = '<li><p class="task-text">Test task</p><div class="task-tags">Tags: tag1, tag2</div></li>';
        saveTasks(0);

        expect(todoListsData[0]).toEqual([{ text: 'Test task', tags: ['tag1', 'tag2'] }]);
    });

    test('loadTasks загружает задачи', () => {
        todoListsData[0] = [{ text: 'Loaded task', tags: ['tag1'] }];

        const taskList = document.getElementById('task-list-0');
        taskList.innerHTML = ''; // Очистим перед загрузкой

        loadTasks(0);

        const taskItems = taskList.querySelectorAll('li');
        expect(taskItems).toHaveLength(1);
        expect(taskItems[0].querySelector('.task-text').textContent).toBe('Loaded task');
        expect(taskItems[0].querySelector('.task-tags').textContent).toBe('Tags: tag1');
    });

    test('showTags отображает теги', () => {
        const container = document.createElement('div');
        const tags = ['tag1', 'tag2'];

        showTags(container, tags);

        const tagsElement = container.querySelector('.task-tags');
        expect(tagsElement).not.toBeNull();
        expect(tagsElement.textContent).toBe('Tags: tag1, tag2');
    });
});
