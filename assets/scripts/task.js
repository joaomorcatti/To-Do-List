let savedTasks = [];
let savedTags = [];

function isValidText(text) {
  if (text.trim() == "") {
    console.log("[Erro] Campo de texto vazio!");
    return false;
  }
  return true;
}

function cleanInput(element, text = "", useFocus = true) {
  element.value = text;
  if (useFocus) {
    element.focus();
  }
}

function openModal(id) {
  document.getElementById(id).classList.add("show");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("show");
}

let editingTaskId = null;
let editingTaskElement = null;
let editingTaskTag = null;

let deletingTaskId = null;

document.addEventListener("DOMContentLoaded", function () {
  let taskEdit = document.querySelector("input.modal-input");
  let tagEdit = document.querySelector("select.modal-select");
  let save = document.querySelector("button.modal-save");
  let cancelSave = document.querySelector("button.modal-cancel");
  let confirmDel = document.querySelector("button.modal-confirm-del");
  let cancelDel = document.querySelector("button.modal-cancel-del");
  let taskContainer = document.querySelector("div.container-task");

  loadLocalStorage(taskContainer);

  save.addEventListener("click", function () {
    if (editingTaskElement && editingTaskTag) {
      let updatedTaskText = taskEdit.value;
      let updatedTagText = tagEdit.value;

      if (isValidText(updatedTaskText)) {
        editingTaskElement.textContent = updatedTaskText;
        editingTaskTag.textContent = updatedTagText;

        let taskToUpdate = savedTasks.find((i) => i.id === editingTaskId);
        if (taskToUpdate) {
          taskToUpdate.task = updatedTaskText;
          taskToUpdate.tag = updatedTagText;
          saveTaskLocalStorage();
        } else {
          console.log(`[ERRO] ID não encontrado`);
        }

        closeModal("modal-edite");
      }
    }
  });
  cancelSave.addEventListener("click", function () {
    closeModal("modal-edite");
  });

  confirmDel.addEventListener("click", function () {
    if (deletingTaskId) {
      let taskID = document.getElementById(deletingTaskId);
      if (taskID) {
        taskID.remove();
      }

      savedTasks = savedTasks.filter((i) => i.id !== deletingTaskId);
      saveTaskLocalStorage();

      closeModal("modal-delete");
    }
  });
  cancelDel.addEventListener("click", function () {
    closeModal("modal-delete");
  });
});

function editTaskElement(id, taskElement, tagElement) {
  let taskEdit = document.querySelector("input.modal-input");
  let tagEdit = document.querySelector("select.modal-select");

  editingTaskId = id;
  editingTaskElement = taskElement;
  editingTaskTag = tagElement;

  taskEdit.value = taskElement.textContent;
  tagEdit.value = tagElement.textContent;

  openModal("modal-edite");
}

function deleteTaskElement(id, task) {
  let taskForDelet = document.querySelector("span.task-for-delet");

  taskForDelet.textContent = task.textContent;

  deletingTaskId = id;

  openModal("modal-delete");
}

function createTaskElement(taskItem, isChecked, taskText, tagText) {
  let checkbox = document.createElement("input");
  let textSpan = document.createElement("span");
  let tagSpan = document.createElement("span");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  taskItem.className = "taskItem";
  checkbox.className = "iCheck";
  textSpan.className = "sText";
  tagSpan.classList.add("sTag-item", "start-left-itens");
  editButton.className = "bEdit";
  deleteButton.className = "bDel";

  checkbox.type = "checkbox";
  checkbox.checked = isChecked;
  textSpan.textContent = taskText;
  tagSpan.textContent = tagText;
  editButton.textContent = "Editar";
  deleteButton.textContent = "Deletar";

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      textSpan.classList.add("completed-Task");
      tagSpan.classList.add("completed-Task");
      editButton.classList.add("completed-Task");
      deleteButton.classList.add("completed-Task");

      let taskToUpdate = savedTasks.find((i) => i.id === taskItem.id);
      if (taskToUpdate) {
        taskToUpdate.check = true;
      }
      saveTaskLocalStorage();
    } else {
      textSpan.classList.remove("completed-Task");
      tagSpan.classList.remove("completed-Task");
      editButton.classList.remove("completed-Task");
      deleteButton.classList.remove("completed-Task");

      let taskToUpdate = savedTasks.find((i) => i.id === taskItem.id);
      if (taskToUpdate) {
        taskToUpdate.check = false;
      }
      saveTaskLocalStorage();
    }
  });

  editButton.addEventListener("click", function () {
    editTaskElement(taskItem.id, textSpan, tagSpan);
  });

  deleteButton.addEventListener("click", function () {
    deleteTaskElement(taskItem.id, textSpan);
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(textSpan);
  taskItem.appendChild(tagSpan);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
}

let nextId = 0;
function addTask() {
  let textInput = document.querySelector("input.iTask");
  let taskContainer = document.querySelector("div.container-task");
  let tagSelect = document.querySelector("select.sTag");
  let taskItem = document.createElement("li");

  let storage = localStorage.getItem("savedTasks_json");
  storage = JSON.parse(storage);

  let taskText = textInput.value;
  let tagText = tagSelect.value;

  if (isValidText(taskText)) {
    nextId =
      savedTasks.length > 0
        ? Math.max(...savedTasks.map((item) => item.id)) + 1
        : 1;

    taskItem.id = nextId;
    createTaskElement(taskItem, false, taskText, tagText);

    let taskData = {
      id: taskItem.id,
      check: false,
      task: taskText,
      tag: tagText,
    };

    savedTasks.push(taskData);
    taskContainer.appendChild(taskItem);
    saveTaskLocalStorage();
  }

  cleanInput(textInput);
  cleanInput(tagSelect, "Selecione uma Tag", false);
}

function createTagOptions(text, taskTag, listTag, editTag) {
  let tagTaskOption = document.createElement("option");
  let tagListOption = document.createElement("option");
  let tagEditOption = document.createElement("option");

  tagTaskOption.text = text;
  tagListOption.text = text;
  tagEditOption.text = text;

  taskTag.appendChild(tagTaskOption);
  listTag.appendChild(tagListOption);
  editTag.appendChild(tagEditOption);
}

function addTag() {
  let tagInput = document.querySelector("input.iTag");
  let taskTag = document.querySelector("select.sTag");
  let tagList = document.querySelector("ul.sidebar-tags");
  let editTag = document.querySelector("select.modal-select");

  let tagText = tagInput.value;

  if (isValidText(tagText)) {
    createTagOptions(tagText, taskTag, tagList, editTag);

    let tagData = {
      tag: tagText,
    };
    savedTags.push(tagData);
    saveTagLocalStorage();
  }

  cleanInput(tagInput);
}

function saveTaskLocalStorage() {
  localStorage.setItem("savedTasks_json", JSON.stringify(savedTasks));
  console.log("Tasks savo no LocalStorage");
}

function saveTagLocalStorage() {
  localStorage.setItem("savedTags_json", JSON.stringify(savedTags));
  console.log("Tags savo no LocalStorage");
}

function loadLocalStorage(taskContainer) {
  let storageTask = localStorage.getItem("savedTasks_json");
  let storageTag = localStorage.getItem("savedTags_json");

  let taskTag = document.querySelector("select.sTag");
  let listTag = document.querySelector("ul.sidebar-tags");
  let editTag = document.querySelector("select.modal-select");

  if (storageTask === null) {
    console.log("[INFO] - LocalStorage TASK vazio");
  } else {
    storageTask = JSON.parse(storageTask);
    savedTasks = storageTask;

    for (let i = 0; i < storageTask.length; i++) {
      let taskItem = document.createElement("li");
      taskItem.id = storageTask[i].id;
      createTaskElement(
        taskItem,
        storageTask[i].check,
        storageTask[i].task,
        storageTask[i].tag,
      );
      taskContainer.appendChild(taskItem);
    }
  }

  if (storageTag === null) {
    console.log("[INFO] - LocalStorage TAG vazio");
  } else {
    storageTag = JSON.parse(storageTag);
    savedTags = storageTag;

    for (let i = 0; i < storageTag.length; i++) {
      let taskTagOption = document.createElement("option");
      let listTagOption = document.createElement("option");
      let editTagOption = document.createElement("option");

      taskTagOption.text = storageTag[i].tag;
      listTagOption.text = storageTag[i].tag;
      editTagOption.text = storageTag[i].tag;

      taskTag.appendChild(taskTagOption);
      listTag.appendChild(listTagOption);
      editTag.appendChild(editTagOption);
    }
  }
}
