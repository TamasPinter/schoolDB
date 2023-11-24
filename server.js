const cTable = require("console.table");
const mysql = require("mysql12");
const inquirer = require("inquirer");
require("dotenv").config();

const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.password,
  database: "SchoolDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  mainMenu();
});

const mainMenu = () => {
  inquirer.createPromptModule([
    {
      type: "list",
      name: "options",
      message:
        "Welcome to the School Database! What would you like to do today?",
      choices: ["View School Information"],
    },
  ]);
};
