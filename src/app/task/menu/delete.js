function deleteTask(taskElement, tabIndex) {
    taskElement.remove();

    const taskIndex = Array.from(taskElement.parentNode.children).indexOf(taskElement);
    todoListsData[tabIndex].splice(taskIndex, 1);
}