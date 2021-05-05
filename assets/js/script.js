const formEl = document.querySelector("#task-form");
const pageContentEl = document.querySelector("#page-content");

const tasksToDoEl = document.querySelector("#tasks-to-do");
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");

let taskIdCounter = 0;

const taskFormHandler = event => {
    event.preventDefault();

    const taskNameInput = document.querySelector("input[name='task-name']").value;
    const taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    const isEdit = formEl.hasAttribute("data-task-id");
    
    // Has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        const taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        const taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
        
        createTaskEl(taskDataObj);
    }
};

const completeEditTask = (taskName, taskType, taskId) => {

    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    // Clean up the edit appearance
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

const createTaskEl = taskDataObj => {
    const listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // Give each task a unique id
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    
    const taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class ='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    const taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);
    // Increment task counter so ids are unique
    taskIdCounter++;
};

const createTaskActions = taskId => {
    const actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // Create edit button
    const editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // Create delete button
    const deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // Create dropdown
    const statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    const statusChoices = ["To Do", "In Progress", "Completed"];

    for (let i = 0; i < statusChoices.length; i++) {
        // Create option element
        const statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

const taskButtonHandler = event => {
    // Get target element from event
    const targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
        // Get that element's task id
        const taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } else if (targetEl.matches(".delete-btn")) {
        // Get that element's task id
        const taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

const taskStatusChangeHandler = event => {
    // Get the task item's id
    const taskId = event.target.getAttribute("data-task-id");
    // Get the currently selected option's value and convert to lowercase
    const statusValue = event.target.value.toLowerCase();
    // Find the parent task item element based on the id
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // Put the selected task in the right spot for its new option
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};

const editTask = taskId => {

    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Get content from task name and type
    const taskName = taskSelected.querySelector("h3.task-name").textContent;
    const taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

const deleteTask = taskId => {
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);