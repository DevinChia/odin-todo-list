import logo from "./images/checklist-icon.svg";
import "./sidebar.css";

export function createSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const sidebarLogo = document.createElement("div");
    sidebarLogo.classList.add("sidebar-logo");
    const logoImage = document.createElement("img");
    logoImage.classList.add("logo-image");
    logoImage.src = logo;
    const logoText = document.createElement("h1");
    logoText.classList.add("logo-text");
    logoText.textContent = "TODO LIST";
    sidebarLogo.appendChild(logoImage);
    sidebarLogo.appendChild(logoText);

    const sidebarContent = document.createElement("div");

    sidebar.appendChild(sidebarLogo);
    sidebar.appendChild(sidebarContent);
}