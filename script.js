const addButton = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

loadTasks();

function addTask() {
  const task = taskInput.value.trim();

  if (task) {
    createTaskElement(task);
    taskInput.value = "";
    saveTasks();
  } else {
    alert("Enter a Task!");
  }
}

addButton.addEventListener("click", addTask);

function createTaskElement(task) {
  const listItem = document.createElement("li");
  listItem.textContent = task;
  taskList.append(listItem);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "deleteTask";
  listItem.append(deleteButton);

  deleteButton.addEventListener("click", function () {
    taskList.removeChild(listItem);
    saveTasks();
  });
}

function saveTasks() {
  let tasks = [];
  taskList.querySelectorAll("li").forEach(function (item) {
    tasks.push(item.textContent.replace("Delete", "").trim());
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(createTaskElement);
}
