function isValidText(text) {
  if (text.trim() != "") {
    return true;
  } else {
    console.log("[Erro] Campo de texto vazio!");
    return false;
  }
}

// cleanInput ou resetInput - A definir, porque na pratica eu estou inserindo um texto no caso das tags, então não seria clean
function cleanInput(element, text = "", useFocus = true) {
  element.value = text;
  if (useFocus) {
    element.focus();
  }
}

function inputForText(element) {
  return element.value;
}

function confirmDelete() {
  let res = window.confirm("Confirma deletar a task?");

  if (res) {
    return true;
  } else {
    console.log("Task não deletada.");
    return false;
  }
}

function deleteTask(id) {
  if (confirmDelete()) {
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
  let bDel = document.createElement("button");

  taskItem.className = "taskItem";
  iCheck.className = "iCheck";
  sText.className = "sText";
  sTag.className = "sTag-item";
  bDel.className = "bDel";

  iCheck.type = "checkbox";
  sText.textContent = `${text}`;
  sTag.textContent = `${tag}`;
  bDel.textContent = "Deletar";

  iCheck.addEventListener("change", function () {
    if (iCheck.checked) {
      sText.className = "completed-sText";
      sTag.className = "completed-sTag-item";
      bDel.className = "completed-bDel";
    } else {
      sText.className = "sText";
      sTag.className = "sTag-item";
      bDel.className = "bDel";
    }
  });

  bDel.addEventListener("click", function () {
    deleteTask(taskItem.id);
  });

  taskItem.appendChild(iCheck);
  taskItem.appendChild(sText);
  taskItem.appendChild(sTag);
  taskItem.appendChild(bDel);
}

let rId = 0;
function addTask() {
  let iText = document.querySelector("input.iTask");
  let local = document.querySelector("div.container-task");
  let sTag = document.querySelector("select.sTag");
  let taskItem = document.createElement("li");

  taskText = inputForText(iText); // Preciso declarar em uma variavel diferente, para poder limprar e usar o .focus().
  tagText = inputForText(sTag);

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
  let dTags = document.querySelector("div.sidebar-tags");

  tagText = inputForText(iTag);

  if (isValidText(tagText)) {
    let oTag = document.createElement("option");

    oTag.text = `${tagText}`;

    sTag.appendChild(oTag);
  }

  cleanInput(iTag);
}
