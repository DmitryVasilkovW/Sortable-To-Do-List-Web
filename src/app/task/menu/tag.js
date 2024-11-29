function showTagSelector(taskElement, tabIndex) {
    const tagSelector = document.createElement('div');
    tagSelector.classList.add('tag-selector');
    tagSelector.innerHTML = `
        <label for="tag-select">Select a tag:</label>
        <select id="tag-select">
            <option value="">Select a tag</option>
            ${tags.map(tag => `<option value="${tag.name}">${tag.name}</option>`).join('')}
        </select>
        <button id="add-tag-button">Add</button>
    `;

    document.body.appendChild(tagSelector);
    activeContextElements.push(tagSelector);

    const addButton = tagSelector.querySelector('#add-tag-button');
    addButton.onclick = () => {
        const selectedTag = tagSelector.querySelector('#tag-select').value;
        if (selectedTag) {
            addTagToTask(taskElement, tabIndex, selectedTag);
        }
        tagSelector.remove();
        removeFromActiveElements(tagSelector);
    };
}

function addTagToTask(taskElement, tabIndex, tagName) {
    const [parsedTag] = parseTags(tagName);

    const taskIndex = Array.from(taskElement.parentNode.children).indexOf(taskElement);
    const taskData = todoListsData[tabIndex][taskIndex];

    if (!taskData.tags.some(t => t.tag === parsedTag.tag)) {
        taskData.tags.push(parsedTag);
        updateTaskDisplay(taskElement, taskData, tabIndex);
        sortTasks(tabIndex);
    } else {
        alert(`Tag "${tagName}" уже добавлен к задаче!`);
    }
}

function parseTags(tagString) {
    return tagString
        .split(', ')
        .filter(tag => tag)
        .map(tagName => {
            const tagObject = tags.find(t => t.name === tagName) ||
                (typeof tags[0] === 'string' ? { name: tagName, weight: 0 } : null);

            return tagObject
                ? { tag: tagObject.name, weight: tagObject.weight || 0 }
                : { tag: tagName, weight: 0 };
        });
}
