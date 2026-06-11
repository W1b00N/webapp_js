function press(value) {
    document.getElementById('display').value += value;
}
function calculate() {
    try {
        const result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch {
        document.getElementById("display").value = "Error";
    }
}
function clearDisplay() {
    document.getElementById('display').value = "";
}

async function loadTodos() {
    const res = await fetch('/api/todos');
    const todos = await res.json();
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        list.appendChild(li);
    });
}

async function addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();
    if (!text) return;
    await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    input.value = '';
    loadTodos();
}
document.addEventListener('DOMContentLoaded', loadTodos);