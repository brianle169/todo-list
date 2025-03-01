import Todo from "./Todo";

// Project module
export default class Project {
  constructor(name = "", todos = []) {
    this.name = name;
    this.todos = todos;
  }

  fillRandomTodos(num) {
    for (let i = 0; i < num; i++) {
      let td = new Todo(
        this.name,
        `Todo #${i + 1}`,
        `Description of todo #${i + 1}`,
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
