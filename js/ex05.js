// Lấy dữ liệu từ LocalStorage khi vừa load trang
let todos = JSON.parse(localStorage.getItem('myTodoList')) || [
    { id: 1, text: "Học JavaScript cơ bản", completed: false }
];

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}" onclick="toggleTodo(${todo.id})">
                ${todo.text}
            </span>
            <span class="delete-btn" onclick="deleteTodo(${todo.id})">x</span>
        `;
        todoList.appendChild(li);
    });
    
    
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('myTodoList', JSON.stringify(todos));
}

function handleAddTodo() {
    const input = document.getElementById('todoInput');
    const newText = input.value.trim();
    if (newText !== "") {
        todos.push({ id: Date.now(), text: newText, completed: false });
        input.value = "";
        renderTodos();
    }
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Khởi chạy ứng dụng
renderTodos();