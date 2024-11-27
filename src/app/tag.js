let tags = [];

function addTag() {
    const newTagInput = document.getElementById('new-tag-input').value;
    if (newTagInput) {
        tags.push(newTagInput);
        renderTags();
        document.getElementById('new-tag-input').value = '';
    }
}

function renderTags() {
    const tagList = document.getElementById('tag-list');
    const tagSelects = document.querySelectorAll('.tag-select');

    tagList.innerHTML = '';
    tagSelects.forEach(select => {
        select.innerHTML = '<option value="">Select a tag</option>';
    });

    tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        tagList.appendChild(li);

        tagSelects.forEach(select => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            select.appendChild(option);
        });
    });
}