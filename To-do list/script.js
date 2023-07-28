const inputBox = document.getElementById("input-box");
const listTasks = document.getElementById("list-tasks");
const addButton = document.getElementById("add-button");

// Retrieve tasks from local storage or initialize an empty array if not found
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render the tasks initially
renderTasks();

// Attach event listener to the "Add" button
addButton.addEventListener("click", addTask);

function addTask(event) {
  event.preventDefault(); // Prevent form submission

  const taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Write something");
  } else {
    const task = {
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    saveData();
    renderTasks();
  }
  inputBox.value = ""; // Clear the input field after adding the task
}

listTasks.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    const li = event.target;
    const taskIndex = li.dataset.index;
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveData();
    renderTasks();
  } else if (event.target.tagName === "SPAN") {
    const li = event.target.parentElement;
    const taskIndex = li.dataset.index;
    tasks.splice(taskIndex, 1);
    saveData();
    renderTasks();
  }
});

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  listTasks.innerHTML = ""; // Clear the current list

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("checked");
    }
    li.dataset.index = index; // Store the task index as a data attribute
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    listTasks.appendChild(li);
  });
}
