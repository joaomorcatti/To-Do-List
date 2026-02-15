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
      sText.classList.add("completed-Task");
      sTag.classList.add("completed-Task");
      bDel.classList.add("completed-Task");
    } else {
      sText.classList.remove("completed-Task");
      sTag.classList.remove("completed-Task");
      bDel.classList.remove("completed-Task");
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

    oTag.text = `${tagText}`;

    sTag.appendChild(oTag);
  }

  cleanInput(iTag);
}
