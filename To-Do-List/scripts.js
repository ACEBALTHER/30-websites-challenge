// Retrieve todo from local storage
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton =document.querySelector(".btn");
const deleteButton = document.querySelector(".deleteButton");

//Initialze 
document.addEventListener("DOMContentLoaded",
     function() {
       addButton.addEventListener("click", addTask);
       todoInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          addTask();
          console.log("Enter key pressed");
        }
   });
            if (deleteButton !== null) {
                // If deleteButton is not null, add the event listener
                deleteButton.addEventListener("click", deleteAllTasks);
            }
        displayTasks();
});

// Function to add a new task
function addTask() {
   const newTask = todoInput.value.trim();
    if (newTask !== "") {
       todo.push({
        Text: newTask,
        disabled: false,
       });
       saveToLocalStorage();
       todoInput.value = "";
       displayTasks();
    }
}

// functoin to  display the tasks
function  displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
     const p = document.createElement("p");
     p.innerHTML = `
        <div class="todo-container">
         <input type="checkbox" class="todo-checkbox" 
          id="input-${index}" ${item.disabled ? "checked" : ""}>

          <p id="todo-${index}" class="${item.disabled ?
             "disabled" : ""}" onclick="editTask(${index})">${item.Text}</p>
        </div>
     `;
     const todoContainer = p.querySelector(".todo-container");
     if (todoContainer) {
       const checkbox = todoContainer.querySelector(".todo-checkbox");
       if (checkbox) {
         checkbox.addEventListener("change", () => {
           toggleTask(index);
         });
       }
     }
      todoList.appendChild(p);
  });
  todoCount.textContent= `${todo.length}: tasks`;
}

//functin to save the tasks to local storage
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
  
}

//function to delete a task
function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

// Function to edit an existing task
// Replaces the task text with an input field for editing, and updates the task upon losing focus
function editTask(index) {
   const todoItem = document.getElementById(`todo-${index}`);
   const existingText = todo[index] && todo[index].Text ? todo[index].Text : "";
   const inputElement = document.createElement("input");
    
   inputElement.value = existingText;
    todoItem.replaceWith(inputElement);

    // Ensure the input element is appended to the DOM before focusing
    setTimeout(() => inputElement.focus(), 0);

    inputElement.addEventListener("blur", function() {
      const updatedText = inputElement.value.trim();
      const newTodoItem = document.createElement("p");
      newTodoItem.id = `todo-${index}`;
      newTodoItem.className = todo[index].disabled ? "disabled" : "";
      newTodoItem.textContent = updatedText || todo[index].Text;
      newTodoItem.setAttribute("onclick", `editTask(${index})`);

      if (updatedText) {
        todo[index].Text = updatedText;
        saveToLocalStorage();
      }
      inputElement.replaceWith(newTodoItem);
    });
}

// Function to toggle task status
function toggleTask(index) {
todo[index].disabled = !todo[index].disabled;
saveToLocalStorage();
displayTasks();
 }

