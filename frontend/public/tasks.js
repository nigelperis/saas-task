const API = "http://localhost:5000";
const token = localStorage.getItem("token");

if (!token) window.location.href = "index.html";

async function loadTasks() {
  const res = await fetch(`${API}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <input id="title-${task._id}" value="${task.title}" />
      <br/>

      <input id="desc-${task._id}" value="${task.description || ""}" />
      <br/>

      <select id="status-${task._id}">
        <option value="TODO" ${
          task.status === "TODO" ? "selected" : ""
        }>TODO</option>
        <option value="IN_PROGRESS" ${
          task.status === "IN_PROGRESS" ? "selected" : ""
        }>IN_PROGRESS</option>
        <option value="DONE" ${
          task.status === "DONE" ? "selected" : ""
        }>DONE</option>
      </select>

      <br/>

      <button onclick="updateTask('${task._id}')">Update</button>
      <button onclick="deleteTask('${task._id}')">Delete</button>

      <hr/>
    `;

    list.appendChild(li);
  });
}

async function createTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;

  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, status }),
  });

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  loadTasks();
}

async function updateTask(id) {
  const title = document.getElementById(`title-${id}`).value;
  const description = document.getElementById(`desc-${id}`).value;
  const status = document.getElementById(`status-${id}`).value;

  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, status }),
  });

  if (res.ok) {
    alert("Task updated successfully");
    loadTasks();
  } else {
    alert("Failed to update task");
  }
}

async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  loadTasks();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

loadTasks();
