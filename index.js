import express from "express";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log("directory-name 👉️", __dirname);

// 👇️ "/home/borislav/Desktop/javascript/dist/index.html"
console.log(path.join(__dirname, "/dist", "index.html"));

import path from "path";

import exphbs from "express-handlebars";

import logger from "./middleware/logger.js";

import todos from "./Todo.js";
import users from "./routes/api/users.js";
//require("./routes/api/members");
const app = express();

//init middleware
//app.use(logger);
//handel bars middle wares
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//home page route
app.get("/", (req, res) =>
  res.render("index", {
    title: "member app",
    todos,
  })
);

//set static folder
app.use(express.static(path.join(__dirname, "public")));
//member api routes
app.use("/api/users", users);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));
