import { format } from "date-fns";
// Todo's module
export default class Todo {
  // Constructor
  constructor(
    title = "",
    description = "",
    dueDate = new Date(),
    priority = "",
    isDone = false,
    projectName = ""
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = format(dueDate, "dd/MM/yyyy");
    this.priority = priority;
    this.isDone = isDone;
    this.projectName = projectName;
  }

  get info() {
    return `${this.priority} - ${this.projectName} - ${this.title} (Due: ${
      this.dueDate
    }): ${this.description} // ${this.isDone ? "Done" : "In Progress"}`;
  }

  checkDone() {
    this.isDone = !this.isDone;
  }

  logInfo() {
    console.log(this.info);
  }
}
