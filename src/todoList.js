const projects = [];

function saveProjects() {
    const localProjects = JSON.stringify(projects);
    localStorage.setItem("projects", localProjects);
}

class Project {
    constructor(name, todos = []) {
        this.name = name;
        this.todos = todos;
    }
}

class Todo {
    constructor(title, description, dueDate, priority, completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    toggleCompleted() {
        this.completed = !this.completed;
        saveProjects();
    }

    updateTodo(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        saveProjects();
    }
}

function createProject(name) {
    const project = new Project(name);
    projects.push(project);
    saveProjects();
}

function addTodo(projectName, title, description, dueDate, priority, completed = false) {
    const todo = new Todo(title, description, dueDate, priority, completed);
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].name === projectName) {
            projects[i].todos.push(todo);
            break;
        }
    }
    saveProjects();
}

function deleteTodo(projectName, todoTitle) {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].name === projectName) {
            for (let j = 0; j < projects[i].todos.length; j++) {
                if (projects[i].todos[j].title === todoTitle) {
                    projects[i].todos.splice(j, 1);
                    break;
                }
            }
            break;
        }
    }
    saveProjects();
}

function loadProjects() {
    const parsedProjects = JSON.parse(localStorage.getItem("projects"));
    for (let i = 0; i < parsedProjects.length; i++) {
        const parsedProject = parsedProjects[i];
        const project = new Project(parsedProject.name);
        projects.push(project);
        for (let j = 0; j < parsedProject.todos.length; j++) {
            const todo = new Todo(parsedProject.todos[j].title, parsedProject.todos[j].description, parsedProject.todos[j].dueDate, parsedProject.todos[j].priority, parsedProject.todos[j].completed);
            project.todos.push(todo);
        }
    }
}

// localStorage.removeItem("projects");
if (localStorage.getItem("projects") === null) {
    createProject("Complete The Odin Project");
    addTodo("Complete The Odin Project", "JavaScript Course", "Complete the JavaScript Course", "30 October 2026", "High");
    addTodo("Complete The Odin Project", "React JS Course", "Complete the React JS Course", "10 November 2026", "Medium");
    addTodo("Complete The Odin Project", "Advanced HTML and CSS Course", "Complete the Advanced HTML and CSS Course", "20 November 2026", "Low");
}
else {
    loadProjects();
}

export { createProject, addTodo, deleteTodo, projects };