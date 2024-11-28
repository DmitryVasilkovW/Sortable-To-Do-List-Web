function deleteTask(taskElement, tabIndex) {
    const taskIndex = Array.from(taskElement.parentNode.children).indexOf(taskElement);
    todoListsData[tabIndex].splice(taskIndex, 1);
    
    taskElement.remove();
}