import { format } from "date-fns";
// Todo's module
export default class Todo {
  // Constructor
  constructor(
    title = "",
    description = "",
    dueDate = new Date(),
    priority = "",
    isDone = false
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = format(dueDate, "dd/MM/yyyy");
    this.priority = priority;
    this.isDone = isDone;
  }

  get info() {
    return `${this.priority} - ${this.title} (Due: ${this.dueDate}): ${
      this.description
    } // ${this.isDone ? "Done" : "In Progress"}`;
  }

  checkDone() {
    this.isDone = !this.isDone;
  }

  logInfo() {
    console.log(this.info);
  }
}
