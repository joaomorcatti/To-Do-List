let tasksSave = [];

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

// Usando variaveis globais para identificar qual a task e tag que estão sendo editadas
// e não ter duplicidade de eventos
let currentIdEdited = null;
let currentTaskEdited = null;
let currentTagEdited = null;

// Executa os "addEventListener" após estár tudo pronto.
document.addEventListener("DOMContentLoaded", function () {
  let modal = document.querySelector("div.modal");
  let taskEdit = document.querySelector("input.modal-input");
  let tagEdit = document.querySelector("select.modal-select");
  let save = document.querySelector("button.modal-save");
  let cancel = document.querySelector("button.modal-cancel");

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
        } else {
          console.log(`[ERRO] ID não encontrado`);
        }

        modal.classList.remove("show");
      }
    }
  });
  cancel.addEventListener("click", function () {
    modal.classList.remove("show");
  });
});

function editTask(id, task, tag) {
  let modal = document.querySelector("div.modal");
  let taskEdit = document.querySelector("input.modal-input");
  let tagEdit = document.querySelector("select.modal-select");

  // Define a tag que vai ser editada
  currentIdEdited = id;
  currentTaskEdited = task;
  currentTagEdited = tag;

  taskEdit.value = task.textContent;
  tagEdit.value = tag.textContent;

  modal.classList.add("show");
}

function deleteTask(id) {
  if (window.confirm("Confirma deletar a task?")) {
    let taskID = document.getElementById(id);
    if (taskID) {
      taskID.remove();
    }

    tasksSave = tasksSave.filter((i) => i.id !== id);
    console.log("Tasks deletada - ID: ", id);
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

      let taskToUpdate = tasksSave.find((i) => i.id === taskItem.id);
      if (taskToUpdate) {
        taskToUpdate.check = true;
      }
    } else {
      sText.classList.remove("completed-Task");
      sTag.classList.remove("completed-Task");
      bDel.classList.remove("completed-Task");

      let taskToUpdate = tasksSave.find((i) => i.id === taskItem.id);
      if (taskToUpdate) {
        taskToUpdate.check = false;
      }
    }
  });

  bEdit.addEventListener("click", function () {
    editTask(taskItem.id, sText, sTag);
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

    let taskData = {
      id: taskItem.id,
      check: false,
      task: taskText,
      tag: tagText,
    };

    tasksSave.push(taskData);
    local.appendChild(taskItem);
  }

  cleanInput(iText);
  cleanInput(sTag, "Selecione uma Tag", false);
}

// Verificar futuramente se essa é a melhor forma de colocar 3 selects com as mesmas opções
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
  }

  cleanInput(iTag);
}
