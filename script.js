// EventListener: Add-Button, Checkbox +Label, selection Radiobuttons, remove-Button

// Globale Variablen
const addBut = document.querySelector("#button-add");
const writeToDo = document.querySelector("#write-to-do"); //Eingabefeld
let arrayToDo = []; //leeres array für toDos
const doList = document.querySelector("#to-do-list");
const radioContainer = document.querySelector(".radio-container");
let currentFilter = "all";
const removeBut = document.querySelector("#button-remove");

//Eventlistener
addBut.addEventListener("click", addToDo);
radioContainer.addEventListener("change", showSelection);
removeBut.addEventListener("click", removeToDoDone);

//Functions:
function addToDo() {
  if (writeToDo.value === "") {
    return;
  }
  arrayToDo.push({
    description: writeToDo.value,
    done: false,
    id: createId(writeToDo.value),
  });
  showToDo(arrayToDo);
  // ToDo anzeigen
}

function showToDo(array) {
  doList.innerText = "";
  for (let todo of array) {
    const doItem = document.createElement("li");
    const checkItem = document.createElement("input");
    const label = document.createElement("label");
    if (currentFilter === "all" && todo.done === true) {
      label.classList.add("checked");
    }
    checkItem.setAttribute("type", "checkbox");
    checkItem.checked = todo.done;

    checkItem.id = todo.id;
    label.innerText = todo.description;
    doItem.prepend(label);
    label.prepend(checkItem);

    doList.appendChild(doItem);
    writeToDo.value = "";
    writeToDo.focus();

    checkItem.addEventListener("change", function () {
      //arrayToDo[index].done = !arrayToDo[index].done; -funktioniert immer bei boolschen Werten - toggle!
      const index = array.findIndex((element) => element.id === checkItem.id);
      if (checkItem.checked === true) {
        if (currentFilter === "all") {
          label.classList.add("checked");
        }
        arrayToDo[index].done = true;
      } else {
        label.classList.remove("checked");
        arrayToDo[index].done = false;
      }
      console.log(arrayToDo[index]);
    });
  }
}

function createId(text) {
  return (
    text.replaceAll(" ", "").toLowerCase() + Math.floor(Math.random() * 10000)
  );
}
//EventListener Radiobuttons

function showSelection(event) {
  /*let radioInput = document.querySelector(".radio-button");*/
  if (event.target.value === "done") {
    const arrayDone = arrayToDo.filter(function (element) {
      return element.done === true;
    });
    currentFilter = "done";
    showToDo(arrayDone);
  } else if (event.target.value === "open") {
    const arrayOpen = arrayToDo.filter(function (element) {
      return element.done === false;
    });
    currentFilter = "open";
    showToDo(arrayOpen);
  } else if (event.target.value === "all") {
    currentFilter = "all";
    showToDo(arrayToDo);
  }
}

function removeToDoDone() {
  let arrayRest = arrayToDo.filter(function (element) {
    return element.done === false;
  });
  arrayToDo = arrayRest;
  showToDo(arrayToDo);
  doList.innerText = "All things done. Chill now and have a nice day!";
}
