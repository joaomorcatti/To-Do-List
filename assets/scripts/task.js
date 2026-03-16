let tasksSave = [];
let tagsSave = [];

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

let currentIdEdited = null;
let currentTaskEdited = null;
let currentTagEdited = null;

let currentIdDeleted = null;

document.addEventListener("DOMContentLoaded", function () {
  let taskEdit = document.querySelector("input.modal-input");
  let tagEdit = document.querySelector("select.modal-select");
  let save = document.querySelector("button.modal-save");
  let cancelSave = document.querySelector("button.modal-cancel");
  let confirmDel = document.querySelector("button.modal-confirm-del");
  let cancelDel = document.querySelector("button.modal-cancel-del");
  let local = document.querySelector("div.container-task");

  loadLocalStorage(local);

  save.addEventListener("click", function () {
    if (currentTaskEdited && currentTagEdited) {
      let newTask = taskEdit.value;
      let newTag = tagEdit.value;

      if (isValidText(newTask)) {
        currentTaskEdited.textContent = newTask;
        currentTagEdited.textContent = newTag;

        let taskToUpdate = tasksSave.find((i) => i.id === currentIdEdited);
        if (taskToUpdate) {
          taskToUpdate.task = newTask;
          taskToUpdate.tag = newTag;
          saveTaskLocalStorage();
        } else {
          console.log(`[ERRO] ID não encontrado`);
        }

        closeModal("modal-edit");
      }
    }
  });
  cancelSave.addEventListener("click", function () {
    closeModal("modal-edit");
  });

  confirmDel.addEventListener("click", function () {
    if (currentIdDeleted) {
      let taskID = document.getElementById(currentIdDeleted);
      if (taskID) {
        taskID.remove();
      }

      tasksSave = tasksSave.filter((i) => i.id !== currentIdDeleted);
      saveTaskLocalStorage();

      closeModal("modal-delet");
    }
  });
  cancelDel.addEventListener("click", function () {
    closeModal("modal-delet");
  });
});

function editTask(id, task, tag) {
  let taskEdit = document.querySelector("input.modal-input");
  let tagEdit = document.querySelector("select.modal-select");

  currentIdEdited = id;
  currentTaskEdited = task;
  currentTagEdited = tag;

  taskEdit.value = task.textContent;
  tagEdit.value = tag.textContent;

  openModal("modal-edit");
}

function deleteTask(id, task, tag) {
  let taskForDelet = document.querySelector("p.task-for-delet");

  taskForDelet.textContent = task.textContent;

  currentIdDeleted = id;

  openModal("modal-delet");
}

function task(taskItem, check, text, tag) {
  let iCheck = document.createElement("input");
  let sText = document.createElement("span");
  let sTag = document.createElement("span");
  let bEdit = document.createElement("button");
  let bDel = document.createElement("button");

  taskItem.className = "taskItem";
  iCheck.className = "iCheck";
  sText.className = "sText";
  sTag.classList.add("sTag-item", "start-left-itens");
  bEdit.className = "bEdit";
  bDel.className = "bDel";

  iCheck.type = "checkbox";
  iCheck.checked = check;
  sText.textContent = text;
  sTag.textContent = tag;
  bEdit.textContent = "Editar";
  bDel.textContent = "Deletar";

  iCheck.addEventListener("change", function () {
    if (iCheck.checked) {
      sText.classList.add("completed-Task");
      sTag.classList.add("completed-Task");
      bEdit.classList.add("completed-Task");
      bDel.classList.add("completed-Task");

      let taskToUpdate = tasksSave.find((i) => i.id === taskItem.id);
      if (taskToUpdate) {
        taskToUpdate.check = true;
      }
      saveTaskLocalStorage();
    } else {
      sText.classList.remove("completed-Task");
      sTag.classList.remove("completed-Task");
      bEdit.classList.remove("completed-Task");
      bDel.classList.remove("completed-Task");

      let taskToUpdate = tasksSave.find((i) => i.id === taskItem.id);
      if (taskToUpdate) {
        taskToUpdate.check = false;
      }
      saveTaskLocalStorage();
    }
  });

  bEdit.addEventListener("click", function () {
    editTask(taskItem.id, sText, sTag);
  });

  bDel.addEventListener("click", function () {
    deleteTask(taskItem.id, sText, sTag);
  });

  taskItem.appendChild(iCheck);
  taskItem.appendChild(sText);
  taskItem.appendChild(sTag);
  taskItem.appendChild(bEdit);
  taskItem.appendChild(bDel);
}

let rId = 0;
function addTask() {
  let iText = document.querySelector("input.iTask");
  let local = document.querySelector("div.container-task");
  let sTag = document.querySelector("select.sTag");
  let taskItem = document.createElement("li");

  let taskText = iText.value;
  let tagText = sTag.value;

  if (isValidText(taskText)) {
    rId =
      tasksSave.length > 0
        ? Math.max(...tasksSave.map((item) => item.id)) + 1
        : 1;

    taskItem.id = rId;
    task(taskItem, false, taskText, tagText);

    let taskData = {
      id: taskItem.id,
      check: false,
      task: taskText,
      tag: tagText,
    };

    tasksSave.push(taskData);
    local.appendChild(taskItem);
    saveTaskLocalStorage();
  }

  cleanInput(iText);
  cleanInput(sTag, "Selecione uma Tag", false);
}

function addTag() {
  let iTag = document.querySelector("input.iTag");
  let taskTag = document.querySelector("select.sTag");
  let listTag = document.querySelector("div.sidebar-tags");
  let editTag = document.querySelector("select.modal-select");

  let tagText = iTag.value;

  if (isValidText(tagText)) {
    let oTagTask = document.createElement("option");
    let oTagList = document.createElement("option");
    let oTagEdit = document.createElement("option");

    oTagTask.text = tagText;
    oTagList.text = tagText;
    oTagEdit.text = tagText;

    taskTag.appendChild(oTagTask);
    listTag.appendChild(oTagList);
    editTag.appendChild(oTagEdit);

    let tagData = {
      tag: tagText,
    };
    tagsSave.push(tagData);
    saveTagLocalStorage();
  }

  cleanInput(iTag);
}

function saveTaskLocalStorage() {
  localStorage.setItem("tasksSave_json", JSON.stringify(tasksSave));
  console.log("Tasks savo no LocalStorage");
}

function saveTagLocalStorage() {
  localStorage.setItem("tagsSave_json", JSON.stringify(tagsSave));
  console.log("Tags savo no LocalStorage");
}

function loadLocalStorage(local) {
  let storageTask = localStorage.getItem("tasksSave_json");
  let storageTag = localStorage.getItem("tagsSave_json");

  let taskTag = document.querySelector("select.sTag");
  let listTag = document.querySelector("div.sidebar-tags");
  let editTag = document.querySelector("select.modal-select");

  if (storageTask === null) {
    console.log("[INFO] - LocalStorage TASK vazio");
  } else {
    storageTask = JSON.parse(storageTask);
    tasksSave = storageTask;

    for (let i = 0; i < storageTask.length; i++) {
      let taskItem = document.createElement("li");
      taskItem.id = storageTask[i].id;
      task(
        taskItem,
        storageTask[i].check,
        storageTask[i].task,
        storageTask[i].tag,
      );
      local.appendChild(taskItem);
    }
  }

  if (storageTag === null) {
    console.log("[INFO] - LocalStorage TAG vazio");
  } else {
    storageTag = JSON.parse(storageTag);
    tagsSave = storageTag;

    for (let i = 0; i < storageTag.length; i++) {
      let oTagTask = document.createElement("option");
      let oTagList = document.createElement("option");
      let oTagEdit = document.createElement("option");

      oTagTask.text = storageTag[i].tag;
      oTagList.text = storageTag[i].tag;
      oTagEdit.text = storageTag[i].tag;

      taskTag.appendChild(oTagTask);
      listTag.appendChild(oTagList);
      editTag.appendChild(oTagEdit);
    }
  }
}
