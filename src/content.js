import { deleteTodo, projects } from "./todoList.js";
import { showDialog } from "./dialog.js";
import "./content.css";

export function createContent() {
    const content = document.querySelector(".content");
    content.textContent = "Projects";
    
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    
    for (let i = 0; i < projects.length; i++) {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        const projectCardHeader = document.createElement("div");
        projectCardHeader.classList.add("project-card-header");

        const projectTitle = document.createElement("p");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = projects[i].name;

        const addTaskButton = document.createElement("button");
        addTaskButton.classList.add("add-task");
        addTaskButton.textContent = "Add Task";

        const projectName = projects[i].name;

        addTaskButton.addEventListener("click", () => {
            showDialog("add-task", projectName);
        })

        projectCardHeader.appendChild(projectTitle);
        projectCardHeader.appendChild(addTaskButton);
        projectCard.appendChild(projectCardHeader);

        const projectTodos = document.createElement("table");
        projectTodos.classList.add("project-todos");

        const tableHeading = document.createElement("thead");

        const tableHeadersName = ["Completed", "Name", "Due Date", "Actions"];
        tableHeadersName.forEach((tableHeaderName) => {
            const tableHeader = document.createElement("th");
            tableHeader.textContent = tableHeaderName;
            tableHeading.appendChild(tableHeader);
        });

        projectTodos.appendChild(tableHeading);

        const tableBody = document.createElement("tbody");

        for (let j = 0; j < projects[i].todos.length; j++) {
            const todoRow = document.createElement("tr");
            todoRow.classList.add("todo-row");

            if (projects[i].todos[j].priority === "High") {
                todoRow.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
            }
            else if (projects[i].todos[j].priority === "Medium") {
                todoRow.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
            }
            else {
                todoRow.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
            }

            const todoCompletedCell = document.createElement("td");
            const todoCompleted = document.createElement("input");
            todoCompleted.type = "checkbox";
            todoCompleted.checked = projects[i].todos[j].completed;

            todoCompleted.addEventListener("click", () => {
                projects[i].todos[j].toggleCompleted();
            })

            const todoTitle = document.createElement("td");
            todoTitle.textContent = projects[i].todos[j].title;
            const todoDueDate = document.createElement("td");
            todoDueDate.textContent = projects[i].todos[j].dueDate;

            const todoActions = document.createElement("td");
            const todoActionsContainer = document.createElement("div");
            todoActionsContainer.classList.add("actions-container");
            const todoEditButton = document.createElement("button");
            todoEditButton.classList.add("edit-button");
            todoEditButton.textContent = "Edit";
            const todoDeleteButton = document.createElement("button");
            todoDeleteButton.classList.add("delete-button");
            todoDeleteButton.textContent = "Delete";

            todoEditButton.addEventListener("click", () => {
                showDialog("edit-button", projectName, projects[i].todos[j].title, projects[i].todos[j].description, projects[i].todos[j].dueDate, projects[i].todos[j].priority);
            })

            todoDeleteButton.addEventListener("click", () => {
                if (confirm("Are you sure you want to delete this todo?") === false) return;
                const projectTodo = projects[i].todos[j].title;
                deleteTodo(projectName, projectTodo);
                while (projectContainer.hasChildNodes()) {
                    projectContainer.removeChild(projectContainer.firstChild);
                }
                createContent();
            })

            todoActionsContainer.appendChild(todoEditButton);
            todoActionsContainer.appendChild(todoDeleteButton);
            todoActions.appendChild(todoActionsContainer);
            
            todoCompletedCell.appendChild(todoCompleted);
            todoRow.appendChild(todoCompletedCell);
            todoRow.appendChild(todoTitle);
            todoRow.appendChild(todoDueDate);
            todoRow.appendChild(todoActions);
            tableBody.appendChild(todoRow);
        }
        
        projectTodos.appendChild(tableBody);
        projectCard.appendChild(projectTodos);
        projectContainer.appendChild(projectCard);
    }

    content.appendChild(projectContainer);
}