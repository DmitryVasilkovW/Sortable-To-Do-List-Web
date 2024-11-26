let tabs = 0;
let todoListsData = [];

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

    renderTags();
    addNewTab();
});
