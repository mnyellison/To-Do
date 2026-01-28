const input = document.getElementById('task-input');
const btn = document.querySelector('.btn-create');
const ul = document.querySelector('ul');
const clipboard = document.querySelector('.clipboard');

const createTask = () => {
    const task = input.value.trim();
    if (task === '') return

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');

    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
    });

    const text = document.createTextNode(task);

    const trash = document.createElement('i');
    trash.classList.add('bx', 'bx-trash-alt');

    trash.addEventListener('click', () => {
        if (confirm('Deseja apagar essa tarefa?')) {
            li.remove();
            checkClipboard();
        }
    });

    li.append(checkbox, text, trash);
    ul.appendChild(li);

    input.value = ''

    checkClipboard();
};

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        createTask();
    }
});

const checkClipboard = () => {
    const hasTasks = ul.children.length > 0;
    clipboard.classList.toggle('clipboard-none', hasTasks);
};

btn.addEventListener('click', createTask);