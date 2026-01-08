const token = localStorage.getItem("token");

if (!token) window.location.href = "index.html";

async function loadTasks() {
  const res = await fetch(`${CONFIG.API_URL}/tasks`, {
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
  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("description");
  const statusInput = document.getElementById("status");

  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const status = statusInput.value;

  if (!title) {
    alert("Task title is required");
    return;
  }

  const res = await fetch(`${CONFIG.API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, status }),
  });

  if (res.status === 403) {
    alert("Free plan limit reached (5 tasks). Upgrade to Pro.");
    return;
  }

  if (!res.ok) {
    alert("Failed to create task");
    return;
  }

  titleInput.value = "";
  descInput.value = "";
  statusInput.value = "TODO";

  loadTasks();
}

async function updateTask(id) {
  const title = document.getElementById(`title-${id}`).value;
  const description = document.getElementById(`desc-${id}`).value;
  const status = document.getElementById(`status-${id}`).value;

  const res = await fetch(`${CONFIG.API_URL}/tasks/${id}`, {
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
  await fetch(`${CONFIG.API_URL}/tasks/${id}`, {
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
