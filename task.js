function isValidText(text) {
  if (text.trim() != "") {
    return true;
  } else {
    return false;
  }
}

function confirmDelete() {
  let res = window.confirm("Confirma deletar a task?");

  if (res) {
    return true;
  } else {
    return false;
  }
}

function deleteTask() {
  if (confirmDelete()) {
    let delTask = document.querySelector("button.bDel");
    let paiDel = delTask.parentElement;
    console.log(paiDel);
    if (paiDel) {
      paiDel.remove();
    }
  } else {
    console.log("Task não deletada.");
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
  sTag.className = "sTag";
  bDel.className = "bDel";

  iCheck.type = "checkbox";
  sText.textContent = `${text}`;
  sTag.textContent = `${tag}`;
  bDel.textContent = "Deletar";

  bDel.addEventListener("click", function () {
    deleteTask();
  });

  taskItem.appendChild(iCheck);
  taskItem.appendChild(sText);
  taskItem.appendChild(sTag);
  taskItem.appendChild(bDel);
}

let rId = 0;
function addTask() {
  let iText = document.querySelector("input#iTask");
  let local = document.querySelector("div#dList");
  let sTag = document.querySelector("select#sTag");
  let taskItem = document.createElement("li");
  taskText = iText.value; // Preciso declarar em uma variavel diferente, para poder limprar e usar o .focus().
  tagText = sTag.value;

  if (isValidText(taskText)) {
    rId++;
    taskItem.id = rId;
    task(taskText, tagText, taskItem);

    local.appendChild(taskItem);
  } else {
    console.log("[Erro] Campo de task vazio!");
  }

  iText.value = "";
  sTag.value = "Selecione uma Tag";
  iText.focus();
}

function addTag() {
  let iTag = document.querySelector("input#iTag");
  let sTag = document.querySelector("select#sTag");
  tagText = iTag.value;

  if (isValidText(tagText)) {
    let tag = document.createElement("option");
    tag.text = `${tagText}`;
    sTag.appendChild(tag);
  } else {
    console.log("[ERRO] Campo de tag vazio!");
  }

  iTag.value = "";
  iTag.focus();
}
