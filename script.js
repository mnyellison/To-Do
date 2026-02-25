const input = document.getElementById('task-creation-box');
const btnTaskCreator = document.querySelector('.btn-task-creator');
const taskList = document.querySelector('.task-list');
const emptyState = document.querySelector('.empty-state');
const modalOverlay = document.querySelector('.modal-overlay');
const btnCancel = document.querySelector('.btn-cancel');
const btnConfirm = document.querySelector('.btn-confirm');

let taskToDelete = null;

// VERIFICA SE A LISTA TÁ VAZIA
const updateEmptyState = () => {
    if (taskList.children.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
};

const createTask = () => {
    const taskText = input.value.trim();
    if (!taskText) return;

    // CRIANDO ELEMENTOS
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-completed');

    const spanText = document.createElement('span');
    spanText.textContent = taskText;

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn-delete');
    btnDelete.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

    // MARCAR/DESMARCAR COMO CONCLÍDA
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
    });

    // MONTANDO A ESTRUTURA
    li.append(checkbox, spanText, btnDelete);
    taskList.appendChild(li);

    updateEmptyState();
    input.value = '';
};

// ABRE O MODAL
const openDeleteModal = (taskItem) => {
    taskToDelete = taskItem;
    modalOverlay.classList.add('active');
};

// FECHA O MODAL
const closeModal = () => {
    modalOverlay.classList.remove('active');
    taskToDelete = null;
};

// CONFIRMA A EXLUSÃO DA TAREFA
const confirmDelete = () => {
    if (taskToDelete) {
        taskToDelete.remove();
        updateEmptyState();
        taskToDelete = null;
    }
    closeModal();
};

// CRIAR TAREFA COM O BOTÃO ENTER
btnTaskCreator.addEventListener('click', createTask);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') createTask();
});

// ABRIR MODAL AO CLICAR NA LIXEIRA
taskList.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.btn-delete');
    if (deleteBtn) {
        const taskItem = deleteBtn.closest('li');
        openDeleteModal(taskItem);
    }
});

btnCancel.addEventListener('click', closeModal);
btnConfirm.addEventListener('click', confirmDelete);