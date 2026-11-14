const API = "http://localhost:8000";

async function loadTodos() {
  const res = await fetch(`${API}/todos`);
  const todos = await res.json();

  const list = document.getElementById("list");
  list.replaceChildren();

  for (const t of todos) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = t.done;
    checkbox.addEventListener("change", () => toggleTodo(t.id, checkbox.checked));

    const span = document.createElement("span");
    span.textContent = t.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Usuń";
    delBtn.addEventListener("click", () => deleteTodo(t.id));

    li.append(checkbox, span, delBtn);
    list.append(li);
  }
}

async function addTodo(title) {
  await fetch(`${API}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
}

async function toggleTodo(id, done) {
  await fetch(`${API}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done }),
  });
}

async function deleteTodo(id) {
  await fetch(`${API}/todos/${id}`, { method: "DELETE" });
  loadTodos();
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("title");
  const title = input.value.trim();
  if (!title) return;

  await addTodo(title);
  input.value = "";
  loadTodos();
});

loadTodos();