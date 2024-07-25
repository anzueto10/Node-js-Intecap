const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const tasks = [];

const addTask = () => {
  const task = {
    id: Date.now(),
    text: taskInput.value,
    completed: false,
  };
  tasks.push(task);
  renderTasks();
  taskInput.value = "";
};

const renderTasks = () => {
  taskList.innerHTML = tasks
    .map(
      ({ id, text, completed }) => `
        <li class="task${completed ? " completed" : ""}" data-id="${id}">
            ${text}
            <button onclick="toggleTask(${id})">Complete</button>
            <button onclick="deleteTask(${id})">Delete</button>
        </li>
    `
    )
    .join("");
};

const toggleTask = (id) => {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
};

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks();
  }
};

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
