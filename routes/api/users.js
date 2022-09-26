import express from "express";
import todo from "../../Todo.js";
const router = express.Router();
let toDoId = 4;
router.get("/", (req, res) => {
  console.log(todo);
  res.send(todo);
});

//create new todo
router.post("/", (req, res) => {
  console.log("create");
  const newToDo = {
    todos: req.body.todos,
    active: req.body.active,
    id: toDoId,
  };
  if (req.body.todos != "") {
    todo.push(newToDo);
    res.redirect("/");
    toDoId++;
  }
  console.log(newToDo);
});

//select todo
router.post("/:id/checked", (req, res) => {
  console.log("checked");
  const found = todo.find((user) => user.id === parseInt(req.params.id));
  console.log(found);
  if (found) {
    console.log(found.checked);
    if (found.checked === "fa-solid fa-check") {
      found.checked = "";
      found.tick = "";
    } else {
      found.checked = "fa-solid fa-check";
      found.tick = "cross-line";
    }
    // found.checked = () => {
    //   found.checked === "fa-solid fa-check" ? "fa-solid fa-check" : "";
    // };
    //found.checked = `fa-solid fa-check`;

    res.redirect("/");
    console.log("first");
  } else {
    res.send("in valid todo");
    console.log("invalid todo");
  }
});

//delete todo
router.post("/:id/delete", (req, res) => {
  console.log("checked");
  const found = todo.findIndex((user) => user.id === parseInt(req.params.id));
  console.log(found);
  todo.splice(found, 1);
  res.redirect("/");
});

//edit todo
router.post("/:id/update", (req, res) => {
  const td = todo.find((td) => td.id === parseInt(req.params.id));
  console.log(td);
  td.active = "disabled";
  td.todos = req.body.todos;
  td.tick = "";
  td.checked = "";
  res.redirect("/");
});
//update tode enabled
router.post("/:id/update/anabled", (req, res) => {
  const td = todo.find((td) => td.id === parseInt(req.params.id));
  td.active = "anabled";
  res.redirect("/");
});

export default router;
