const formE1 = document.querySelector("#task-form");
const tasksToDoE1 = document.querySelector("#tasks-to-do");

const createTaskHandler = function(event) {
    event.preventDefault();

    const listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
    listItemE1.textContent = "This is a new task";
    tasksToDoE1.appendChild(listItemE1);
};

formE1.addEventListener("submit", createTaskHandler(event));