// Globale Variablen *******************************************************************

const addBut = document.querySelector("#button-add");
const writeToDo = document.querySelector("#write-to-do"); //Eingabefeld
const doList = document.querySelector(".to-do-list");
const radioContainer = document.querySelector(".radio-container");
let currentFilter = "all";
const removeBut = document.querySelector("#button-remove");

//Starte Applikation *******************************************************************

//Local Storage - wenn null, dann leeres array
let arrayToDo = JSON.parse(localStorage.getItem("safe")) || []; //leeres array für toDos
showToDo(arrayToDo);

//Eventlistener ************************************************************************

addBut.addEventListener("click", addToDo);
radioContainer.addEventListener("change", showSelection);
removeBut.addEventListener("click", removeToDoDone);

//**************************************************************************************

function addToDo() {
  if (writeToDo.value === "") {
    return;
  }
  arrayToDo.push({
    description: writeToDo.value,
    done: false,
    id: createId(writeToDo.value),
  });
  localStorage.setItem("safe", JSON.stringify(arrayToDo));
  showToDo(arrayToDo);
}

//**************************************************************************************

function showToDo(array) {
  doList.innerText = "";
  doList.classList.remove("empty-style");
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
        array[index].done = true;
      } else {
        label.classList.remove("checked");
        array[index].done = false;
      }
      localStorage.setItem("safe", JSON.stringify(arrayToDo));
    });
  }
}

//*********************************************************************************

function createId(text) {
  return (
    text.replaceAll(" ", "").toLowerCase() + Math.floor(Math.random() * 10000)
  );
}
//**********************************************************************************

function showSelection(event) {
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
  } else {
    currentFilter = "all";
    showToDo(arrayToDo);
  }
}

//*********************************************************************************

function removeToDoDone() {
  let arrayRest = arrayToDo.filter(function (element) {
    return element.done === false;
  });
  arrayToDo = arrayRest;
  localStorage.setItem("safe", JSON.stringify(arrayToDo));

  if (arrayToDo.length < 1) {
    doList.innerText = "All things done :-) Chill now and have a nice day!";
    doList.classList.add("empty-style");
  } else {
    showToDo(arrayToDo);
  }
}
