function editTodo(id, todo) {
    document.getElementById('todoId').value = id;
    document.getElementById('todoInput').value = todo;
    document.getElementById('todoForm').action = `/edit-todo?id=${id}`;
}