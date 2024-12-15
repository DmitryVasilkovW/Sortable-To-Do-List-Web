function applyFilter(tabIndex) {
    openFilterModal(tabIndex)
    const filterInput = document.getElementById(`filter-input-${tabIndex}`);
    const tagsString = filterInput.value.trim();
    const selectedTags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];

    if (selectedTags.length > 0) {
        filterTasks(tabIndex, selectedTags);
    } else {
        alert('Please enter at least one tag to filter!');
    }
}

function filterTasks(tabIndex, selectedTags) {
    const taskList = document.getElementById(`task-list-${tabIndex}`);
    taskList.innerHTML = '';

    const tasks = todoListsData[tabIndex];
    const filteredTasks = tasks.filter(task =>
        selectedTags.every(tag => task.tags.some(t => t.tag === tag))
    );

    filteredTasks.forEach(task => {
        const li = createTask(task.text, task.tags, tabIndex);
        taskList.appendChild(li);
    });
}

function resetFilter(tabIndex) {
    loadTasks(tabIndex);
    const filterInput = document.getElementById(`filter-input-${tabIndex}`);
    filterInput.value = '';
}

function openFilterModal(tabIndex) {
    if (!document.getElementById('filter-modal')) {
        const modal = document.createElement('div');
        modal.id = 'filter-modal';
        modal.className = 'modal hidden';

        modal.innerHTML = `
            <div class="modal-content">
                <h3>Filter Tasks by Tags</h3>
                <div id="tags-selector">
                    ${tags
            .map(
                (tag) => `
                        <label>
                            <input type="checkbox" value="${tag.name}">
                            ${tag.name}
                        </label>
                    `
            )
            .join('')}
                </div>
                <div class="modal-buttons">
                    <button id="filter-cancel-button">Cancel</button>
                    <button id="filter-apply-button">Apply</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    const modal = document.getElementById('filter-modal');
    const applyButton = document.getElementById('filter-apply-button');
    const cancelButton = document.getElementById('filter-cancel-button');

    modal.classList.remove('hidden');

    applyButton.onclick = () => {
        const selectedTags = Array.from(
            modal.querySelectorAll('#tags-selector input:checked')
        ).map((checkbox) => checkbox.value);

        if (selectedTags.length > 0) {
            filterTasks(tabIndex, selectedTags);
            closeFilterModal();
        } else {
            alert('Please select at least one tag to filter!');
        }
    };

    cancelButton.onclick = closeFilterModal;
}

function closeFilterModal() {
    const modal = document.getElementById('filter-modal');
    if (modal) {
        modal.remove();
    }
}
