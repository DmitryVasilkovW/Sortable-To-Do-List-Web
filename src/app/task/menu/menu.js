const activeContextElements = [];

function createMenuButton(taskElement, tabIndex) {
    const menuButton = document.createElement('button');
    menuButton.textContent = '...';
    menuButton.classList.add('menu-button');

    menuButton.onclick = (event) => {
        event.stopPropagation();
        showContextMenu(event, taskElement, tabIndex);
    };

    return menuButton;
}

function showContextMenu(event, taskElement, tabIndex) {
    const contextMenu = document.createElement('ul');
    contextMenu.classList.add('context-menu');

    const deleteOption = createDeleteOption(contextMenu, taskElement, tabIndex);
    contextMenu.appendChild(deleteOption);

    const addTagOption = createAddTagOption(contextMenu, taskElement, tabIndex);
    contextMenu.appendChild(addTagOption);

    document.body.appendChild(contextMenu);
    activeContextElements.push(contextMenu);

    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;

    document.addEventListener('click', function closeMenu(event) {
        if (!contextMenu.contains(event.target)) {
            closeAllContextElements(event);
            document.removeEventListener('click', closeMenu);
        }
    });
}

function createDeleteOption(contextMenu, taskElement, tabIndex) {
    const deleteOption = document.createElement('li');
    deleteOption.textContent = 'Remove task';
    deleteOption.classList.add('delete-option');
    deleteOption.onclick = () => {
        deleteTask(taskElement, tabIndex);
        contextMenu.remove();
        removeFromActiveElements(contextMenu);
    };
    return deleteOption;
}

function createAddTagOption(contextMenu, taskElement, tabIndex) {
    const addTagOption = document.createElement('li');
    addTagOption.textContent = 'Add Tag';
    addTagOption.classList.add('add-tag-option');
    addTagOption.onclick = () => {
        showTagSelector(taskElement, tabIndex);
        contextMenu.remove();
        removeFromActiveElements(contextMenu);
    };
    return addTagOption;
}


function closeAllContextElements(event) {
    const clickedInside = activeContextElements.some(element =>
        element.contains(event.target)
    );

    if (!clickedInside) {
        activeContextElements.forEach(element => element.remove());
        activeContextElements.length = 0;
    }
}

function removeFromActiveElements(element) {
    const index = activeContextElements.indexOf(element);
    if (index !== -1) {
        activeContextElements.splice(index, 1);
    }
}