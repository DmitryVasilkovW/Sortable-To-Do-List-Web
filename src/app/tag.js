let tags = [];

function addTag() {
    const newTagInput = document.getElementById('new-tag-input').value;
    if (newTagInput) {
        tags.push({ name: newTagInput, weight: tags.length });
        renderTags();
        document.getElementById('new-tag-input').value = '';
    }
}

function renderTags() {
    const tagList = document.getElementById('tag-list');
    tagList.innerHTML = '';

    tags.forEach((tag, index) => {
        const li = document.createElement('li');
        li.textContent = `${tag.name} (Вес: ${tag.weight})`;
        li.dataset.index = index.toFixed();
        li.draggable = true;
        tagList.appendChild(li);
    });
}

function enableTagDragging() {
    const tagList = document.getElementById('tag-list');
    let draggedIndex = null;

    tagList.addEventListener('dragstart', (e) => {
        draggedIndex = e.target.dataset.index;
    });

    tagList.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    tagList.addEventListener('drop', (e) => {
        const targetIndex = e.target.dataset.index;
        if (draggedIndex !== null && targetIndex !== null) {
            const draggedTag = tags[draggedIndex];
            tags.splice(draggedIndex, 1);
            tags.splice(parseInt(targetIndex), 0, draggedTag);

            tags.forEach((tag, index) => {
                tag.weight = index;
            });

            renderTags();
            updateAllTaskWeights();
        }
    });
}

function updateAllTaskWeights() {
    todoListsData.forEach((tasks, tabIndex) => {
        tasks.forEach(task => {
            task.tags.forEach(tag => {
                const updatedTag = tags.find(t => t.name === tag.tag);
                if (updatedTag) {
                    tag.weight = updatedTag.weight;
                }
            });
        });
        sortTasks(tabIndex);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderTags();
    enableTagDragging();
});
