const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value;
    
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            complete: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = '';
    }
    
};

function updateTodoList() {
    todoListUL.innerHTML = '';
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}


function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todo
    const todoLi = document.createElement('li');
    const todoText = todo.text;
    todoLi.className = "todo"
    todoLi.innerHTML = `
                <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <i class="fa-solid fa-check" id="done"></i>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <i class="fa-solid fa-trash"></i>
                </button>
    `;

    const deleteButton = todoLi.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
        deleteTodoItem(todoIndex);
    });

    const checkbox = todoLi.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function() {
        allTodos[todoIndex].complete = checkbox.checked;
        saveTodos();
    });

    checkbox.checked = todo.complete;

    return todoLi;
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, index) => index !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todoJson = JSON.stringify(allTodos)
    localStorage.setItem("todos", todoJson)
}

function getTodos() {
    const todos = localStorage.getItem("todos");
    if (!todos) return [];
    try {
        return JSON.parse(todos);
    } catch (e) {
        return [];
    }
}