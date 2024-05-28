const createInputBox = document.querySelector(".create-input-box");
const updateInputBox = document.querySelector(".update-input-box");
const saveButton = document.querySelector("#save-task-btn");
const createTask = document.querySelector("#create-task");
const updateTaskId = document.querySelector("#taskId");
const updTask = document.querySelector("#update-task");
const taskList = document.querySelector(".task-listing");
const updateTaskBtn = document.querySelector("#update-task-btn");
const completedCheck = document.querySelector("#completed");
let page = 0;
let totalPage;

document.addEventListener("DOMContentLoaded", () => {
  loadTask(page);
});

saveButton.addEventListener("click", () => {
  addTask();
});

document.addEventListener("click", (even) => {
  if (even.target.classList.contains("delete-task")) {
    const deleteId = even.target.id;
    deleteTask(deleteId);
  }
});

document.addEventListener("click", (even) => {
  if (even.target.classList.contains("edit-task")) {
    const editId = even.target.id;
    editTask(editId);
  }
});

updateTaskBtn.addEventListener("click", () => {
  updateTask();
});

const loadTask = (p) => {
  console.log(p);
  fetch(`http://localhost:4000/api/v1/tasks?page=${p}`)
    .then((res) => res.json())
    .then((data) => {
      const tasksHTML = data.tasks
        .map(
          (task) => `
        <div class="task">
          <span class="${task.completed ? "is-completed" : ""}">
          ${task.completed ? '<i class="fa fa-check"> </i>' : ""} 
          ${task.name}</span>
          <span>
            <i class="fa-solid fa-pen-to-square edit-task" id=${task._id}></i>
            &nbsp; &nbsp; &nbsp;
            <i class="fa-solid fa-trash-can delete-task" id=${task._id}></i>
          </span>
        </div>
      `
        )
        .join("");

      taskList.innerHTML += tasksHTML;
      totalPage = data.totalPage;
    })
    .catch((error) => console.log(error));
};

const addTask = () => {
  fetch(`http://localhost:4000/api/v1/tasks`, {
    method: "POST",
    body: JSON.stringify({ name: createTask.value }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      createTask.value = "";
      location.reload();
    })
    .catch((error) => console.log(error));
};

const editTask = (id) => {
  fetch(`http://localhost:4000/api/v1/tasks/${id}`)
    .then((res) => res.json())
    .then((data) => {
      createInputBox.style.display = "none";
      updateInputBox.style.display = "block";
      updateTaskId.value = id;
      updTask.value = data.task.name;
      completedCheck.checked = data.task.completed;
    })
    .catch((error) => console.log(error));
};

const updateTask = () => {
  const id = updateTaskId.value;
  const name = updTask.value;
  const completed = completedCheck.checked;

  fetch(`http://localhost:4000/api/v1/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name, completed }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      taskList.innerHTML = "";
      location.reload();
      updateTaskId.value = "";
      updTask.value = "";
      completedCheck.checked = false;

      createInputBox.style.display = "block";
      updateInputBox.style.display = "none";
    })
    .catch((error) => console.log(error));
};

const deleteTask = (id) => {
  fetch(`http://localhost:4000/api/v1/tasks/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      taskList.innerHTML = "";
      location.reload();
    })
    .catch((error) => console.log(error));
};

const handleScroll = () => {
  const scrollTop = taskList.scrollTop;
  const scrollHeight = taskList.scrollHeight;
  const offsetHeight = taskList.offsetHeight;
  const remainingScroll = scrollHeight - scrollTop - offsetHeight;
  if (remainingScroll < 500) {
    const loadPage = totalPage > page ? ++page : page;
    loadTask(loadPage);
  }
};

taskList.addEventListener("scroll", handleScroll);
