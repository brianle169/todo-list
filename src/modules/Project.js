import Todo from "./Todo";

// Project module
export default class Project {
  constructor(name = "", type = "custom", todos = []) {
    this.name = name;
    this.type = type;
    this.todos = todos;
  }

  logTodos() {
    for (const todo of this.todos) {
      todo.logInfo();
    }
  }
}
