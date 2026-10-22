import { showDialog } from "./dialog.js";
import "./header.css";

export function createHeader() {
    const createProjectButton = document.createElement("button");
    createProjectButton.classList.add("create-project");
    createProjectButton.textContent = "Create New Project";
    
    createProjectButton.addEventListener("click", () => {
        showDialog("create-project");
    })

    const content = document.querySelector(".header");
    content.textContent = "What should we do today?";
    content.appendChild(createProjectButton);
}