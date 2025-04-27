const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

// add a new task
function addTask() {
    if (inputBox.value === '') {
        alert("Do you have any Task to List!")
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span")
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

// for checking or deleting tasks
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    } else if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

// filter tasks
function filterTasks(filter) {
    let tasks = listContainer.getElementsByTagName("li");
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (filter === "all") {
            task.style.display = "flex"; // Show all
        } else if (filter === "completed") {
            if (task.classList.contains("checked")) {
                task.style.display = "flex"; // Show only completed
            } else {
                task.style.display = "none"; // Hide others
            }
        } else if (filter === "pending") {
            if (!task.classList.contains("checked")) {
                task.style.display = "flex"; // Show only pending
            } else {
                task.style.display = "none"; // Hide others
            }
        }
    }
    // active button style
    let buttons = document.querySelectorAll("#filters button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }
    if (filter === "all") {
        buttons[0].classList.add("active");
    } else if (filter === "completed") {
        buttons[1].classList.add("active");
    } else if (filter === "pending") {
        buttons[2].classList.add("active");
    }
}


// save list data to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
// show tasks from local storage on page load
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

