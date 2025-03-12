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
    this.dueDate = format(dueDate, "PP");
    this.priority = priority;
    this.isDone = isDone;
  }

  get code() {
    return `${this.projectName.toLowerCase().replaceAll(" ", "_")}-${this.title
      .toLowerCase()
      .replaceAll(" ", "_")}`;
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

  isToday() {
    let today = format(new Date(), "PP");
    return this.dueDate === today;
  }
}
