// Project module
export default class Project {
  constructor(name = "", type = "custom", todos = []) {
    this.name = name;
    this.type = type;
    this.todos = todos;
  }
}
