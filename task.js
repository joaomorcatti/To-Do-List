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

function editTask(task, tag) {
  let modal = document.querySelector("div.modal");
  let taskEdit = document.querySelector("input.modal-input");
  let tagEdit = document.querySelector("select.modal-select");
  let save = document.querySelector("button.modal-save");
  let cancel = document.querySelector("button.modal-cancel");

  taskEdit.value = task.textContent;
  tagEdit.value = tag.textContent;

  modal.classList.add("show");

  save.addEventListener("click", function () {
    let newTask = taskEdit.value;
    let newTag = tagEdit.value;

    task.textContent = newTask;
    tag.textContent = newTag;

    modal.classList.remove("show");
  });
  cancel.addEventListener("click", function () {
    modal.classList.remove("show");
  });
}

function deleteTask(id) {
  if (window.confirm("Confirma deletar a task?")) {
    let taskID = document.getElementById(id);
    if (taskID) {
      taskID.remove();
    }
  }
}

function task(text, tag, taskItem) {
  let iCheck = document.createElement("input");
  let sText = document.createElement("span");
  let sTag = document.createElement("span");
  let bEdit = document.createElement("button");
  let bDel = document.createElement("button");

  taskItem.className = "taskItem";
  iCheck.className = "iCheck";
  sText.className = "sText";
  sTag.className = "sTag-item";
  bEdit.className = "bEdit";
  bDel.className = "bDel";

  iCheck.type = "checkbox";
  sText.textContent = text;
  sTag.textContent = tag;
  bEdit.textContent = "Editar";
  bDel.textContent = "Deletar";

  iCheck.addEventListener("change", function () {
    if (iCheck.checked) {
      sText.classList.add("completed-Task");
      sTag.classList.add("completed-Task");
      bDel.classList.add("completed-Task");
    } else {
      sText.classList.remove("completed-Task");
      sTag.classList.remove("completed-Task");
      bDel.classList.remove("completed-Task");
    }
  });

  bEdit.addEventListener("click", function () {
    editTask(sText, sTag);
  });

  bDel.addEventListener("click", function () {
    deleteTask(taskItem.id);
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
    rId++;
    taskItem.id = rId;
    task(taskText, tagText, taskItem);

    local.appendChild(taskItem);
  }

  cleanInput(iText);
  cleanInput(sTag, "Selecione uma Tag", false);
}

function addTag() {
  let iTag = document.querySelector("input.iTag");
  let sTag = document.querySelector("select.sTag");

  let tagText = iTag.value;

  if (isValidText(tagText)) {
    let oTag = document.createElement("option");

    oTag.text = tagText;

    sTag.appendChild(oTag);
  }

  cleanInput(iTag);
}
