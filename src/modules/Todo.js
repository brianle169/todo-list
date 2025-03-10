import { format, parseISO } from "date-fns";
// Todo's module
export default class Todo {
  // Constructor
  constructor(
    projectName = "Home",
    title = "",
    description = "",
    dueDate = new Date(),
    priority = "",
    isDone = false
  ) {
    this.projectName = projectName;
    this.title = title;
    this.description = description;
    this.dueDate = format(parseISO(dueDate), "PP");
    this.priority = priority;
    this.isDone = isDone;
    this.code = `${projectName.toLowerCase()}-${title
      .toLowerCase()
      .replaceAll(" ", "_")}`;
  }

  get info() {
    return `${this.priority} - ${this.projectName} - ${this.title} (Due: ${
      this.dueDate
    }): ${this.description} // ${this.isDone ? "Done" : "In Progress"}`;
  }

  update(title, description, dueDate, priority) {
    this.title = title || this.title;
    this.description = description || this.description;
    if (dueDate) {
      this.dueDate = format(parseISO(dueDate), "PP");
    }
    this.priority = priority || this.priority;
  }

  checkDone() {
    this.isDone = !this.isDone;
  }

  logInfo() {
    console.log(this.info);
  }

  isToday() {
    let today = format(new Date(), "PP");
    return this.dueDate === today;
  }
}
