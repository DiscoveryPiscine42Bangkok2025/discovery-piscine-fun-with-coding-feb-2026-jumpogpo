$(document).ready(function () {
  loadTodos();

  $("#new").on("click", function () {
    const text = prompt("Enter a new TO DO:");
    if (text && $.trim(text) !== "") {
      addTodo($.trim(text));
    }
  });
});

function addTodo(text, save = true) {
  const $todo = $("<div></div>")
    .addClass("todo")
    .text(text)
    .on("click", function () {
      if (confirm("Do you want to remove this TO DO?")) {
        $(this).remove();
        saveTodos();
      }
    });

  $("#ft_list").prepend($todo);

  if (save) saveTodos();
}

function saveTodos() {
  const todos = [];
  $("#ft_list .todo").each(function () {
    todos.push($(this).text());
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
