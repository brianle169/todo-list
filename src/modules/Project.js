import Todo from "./Todo";

// Project module
export default class Project {
  constructor(name = "", type = "custom", todos = []) {
    this.name = name;
    this.type = type;
    this.todos = todos;
  }

  fillRandomTodos(num) {
    for (let i = 0; i < num; i++) {
      let td = new Todo(
        this.name,
        `Todo #${i + 1}`,
        `${this.name} - Description of todo #${i + 1}`,
        new Date(new Date() - Math.random() * 1e10),
        "high",
        false
      );
      this.todos.push(td);
    }
  }

  logTodos() {
    for (const todo of this.todos) {
      todo.logInfo();
    }
  }
}
