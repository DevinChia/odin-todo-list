import { parse, parseISO, format } from "date-fns";
import { createProject, projects } from "./todoList.js";
import { createContent } from "./content.js";
import { addTodo } from "./todoList.js";
import "./dialog.css"

export function showDialog(buttonClass, projectName = "", todoName = "", todoDesc = "", todoDueDate = "", todoPriority = "") {
    const dialog = document.querySelector("dialog");
    const modal = document.querySelector(".modal");
    while (modal.hasChildNodes()) {
        modal.removeChild(modal.firstChild);
    }
    
    const form = document.createElement("form");
    const formFields = document.createElement("div");
    formFields.classList.add("form-fields");
    
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add("submit-button");
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = "Cancel";

    if (buttonClass === "create-project") {
        modal.textContent = "New Project";
        submitButton.textContent = "Create Project";
    }
    else if (buttonClass === "add-task") {
        modal.textContent = "New Task";
        submitButton.textContent = "Add Task";
    }
    else {
        modal.textContent = "Edit Task";
        submitButton.textContent = "Update Task";
    }
    
    form.appendChild(formFields);
    buttonsContainer.appendChild(submitButton);
    buttonsContainer.appendChild(cancelButton);
    form.appendChild(buttonsContainer);
    modal.appendChild(form);

    if (buttonClass === "create-project") {
        const projectNameField = document.createElement("div");
        projectNameField.classList.add("field");
        const projectNameLabel = document.createElement("label");
        projectNameLabel.htmlFor = "project-name"
        projectNameLabel.textContent = "Project Name:";
        const projectNameInput = document.createElement("input");
        projectNameInput.type = "text";
        projectNameInput.id = "project-name";
        projectNameInput.name = "project-name";
        projectNameInput.required = true;
    
        projectNameField.appendChild(projectNameLabel);
        projectNameField.appendChild(projectNameInput);
    
        formFields.appendChild(projectNameField);
    }
    else {
        const taskNameField = document.createElement("div");
        taskNameField.classList.add("field");
        const taskNameLabel = document.createElement("label");
        taskNameLabel.htmlFor = "task-name"
        taskNameLabel.textContent = "Name:";
        const taskNameInput = document.createElement("input");
        taskNameInput.type = "text";
        taskNameInput.id = "task-name";
        taskNameInput.name = "task-name";
        taskNameInput.required = true;

        const taskDescField = document.createElement("div");
        taskDescField.classList.add("field");
        const taskDescLabel = document.createElement("label");
        taskDescLabel.htmlFor = "task-desc"
        taskDescLabel.textContent = "Description:";
        const taskDescInput = document.createElement("input");
        taskDescInput.type = "text";
        taskDescInput.id = "task-desc";
        taskDescInput.name = "task-desc";
        taskDescInput.required = true;

        const taskDueDateField = document.createElement("div");
        taskDueDateField.classList.add("field");
        const taskDueDateLabel = document.createElement("label");
        taskDueDateLabel.htmlFor = "task-due-date"
        taskDueDateLabel.textContent = "Due Date:";
        const taskDueDateInput = document.createElement("input");
        taskDueDateInput.type = "date";
        taskDueDateInput.id = "task-due-date";
        taskDueDateInput.name = "task-due-date";
        taskDueDateInput.required = true;

        const taskPriorityField = document.createElement("div");
        taskPriorityField.classList.add("field");
        const taskPriorityLabel = document.createElement("label");
        taskPriorityLabel.htmlFor = "task-priority"
        taskPriorityLabel.textContent = "Priority:";
        const taskPriorityInput = document.createElement("select");
        taskPriorityInput.id = "task-priority";
        taskPriorityInput.name = "task-priority";
        taskPriorityInput.required = true;
        const priorities = [
            {
                value: "high",
                text: "High"
            },
            {
                value: "medium",
                text: "Medium"
            },
            {
                value: "low",
                text: "Low"
            }
        ];

        for (let i = 0; i < priorities.length; i++) {
            const option = document.createElement("option");
            option.value = priorities[i].value;
            if (buttonClass === "add-task" && i === 0) {
                option.selected = true;
            }
            else if (buttonClass === "edit-button" && todoPriority === priorities[i].text) {
                option.selected = true;
            }
            option.textContent = priorities[i].text;
            taskPriorityInput.appendChild(option);
        }

        if (buttonClass === "edit-button") {
            taskNameInput.value = todoName;
            taskDescInput.value = todoDesc;
            const formattedtodoDueDate = format(parse(todoDueDate, "dd MMMM yyyy", new Date()), "yyyy-MM-dd");
            taskDueDateInput.value = formattedtodoDueDate;
        }
    
        taskNameField.appendChild(taskNameLabel);
        taskNameField.appendChild(taskNameInput);
        
        taskDescField.appendChild(taskDescLabel);
        taskDescField.appendChild(taskDescInput);

        taskDueDateField.appendChild(taskDueDateLabel);
        taskDueDateField.appendChild(taskDueDateInput);

        taskPriorityField.appendChild(taskPriorityLabel);
        taskPriorityField.appendChild(taskPriorityInput);
    
        formFields.appendChild(taskNameField);
        formFields.appendChild(taskDescField);
        formFields.appendChild(taskDueDateField);
        formFields.appendChild(taskPriorityField);
    }

    dialog.showModal();

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const projectContainer = document.querySelector(".project-container");
        if (buttonClass === "create-project") {
            const newProjectName = document.getElementById("project-name").value;
            createProject(newProjectName);
        }
        else {
            const taskName = document.getElementById("task-name").value;
            const taskDesc = document.getElementById("task-desc").value;
            const taskdueDate = document.getElementById("task-due-date").value;
            const taskPriority = document.getElementById("task-priority").value;

            const formattedDate = format(parseISO(taskdueDate), "dd MMMM yyyy");
            const formattedPriority = taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1);

            if (buttonClass === "add-task") {
                addTodo(projectName, taskName, taskDesc, formattedDate, formattedPriority);
            }
            else {
                for (let i = 0; i < projects.length; i++) {
                    if (projects[i].name === projectName) {
                        for (let j = 0; j < projects[i].todos.length; j++) {
                            if (projects[i].todos[j].title === todoName) {
                                projects[i].todos[j].updateTodo(taskName, taskDesc, formattedDate, formattedPriority);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }

        dialog.close();
        while (projectContainer.hasChildNodes()) {
            projectContainer.removeChild(projectContainer.firstChild);
        }
        createContent();
    })

    cancelButton.addEventListener("click", () => {
        dialog.close();
    })
}
