document.addEventListener("DOMContentLoaded", loadTodos);

const ftList = document.getElementById("ft_list");
const newButton = document.getElementById("new");

newButton.addEventListener("click", () => {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    addTodo(text.trim());
    saveTodos();
  }
});

function addTodo(text, save = true) {
  const todo = document.createElement("div");
  todo.className = "todo";
  todo.textContent = text;

  todo.addEventListener("click", () => {
    if (confirm("Do you want to remove this TO DO?")) {
      todo.remove();
      saveTodos();
    }
  });

  ftList.insertBefore(todo, ftList.firstChild);

  if (save) saveTodos();
}

function saveTodos() {
  const todos = [];
  ftList.querySelectorAll(".todo").forEach((todo) => {
    todos.push(todo.textContent);
  });
  document.cookie =
    "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
}

function loadTodos() {
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith("todos="));

  if (!cookie) return;

  const todos = JSON.parse(decodeURIComponent(cookie.split("=")[1]));

  todos.reverse().forEach((todo) => addTodo(todo, false));
}
