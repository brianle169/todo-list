// Project code goes below here.
import "./style.css";
import Todo from "./modules/appLogic/Todo.js";
import Project from "./modules/appLogic/Project.js";
import { Controller } from "./modules/appLogic/Controller.js";

const prj = new Project("test1", "al;skjdfl;asjfd", []);
prj.fillRandomTodos(5);
const prj2 = new Project("test2", "jalksjdlfkj", []);
prj2.fillRandomTodos(7);
const prj3 = new Project("test3", "asldjfl;akjsf", []);
prj3.fillRandomTodos(8);

const prjList = [prj, prj2, prj3];
Controller.displayAllTodos(prjList);
