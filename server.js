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
  inquirer
    .createPromptModule([
      {
        type: "list",
        name: "options",
        message:
          "Welcome to the School Database! What would you like to do today?",
        choices: [
          "View School Information",
          "View Grade Information",
          "View Classrooms Information",
          "View Teachers Information",
          "View All Students",
          "View all Subjects",
          "View All Marks",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;
      if (choices === "View School Information") {
        viewSchoolInfo();
      }
      if (choices === "View Grade Information") {
        viewGradeInfo();
      }
      if (choices === "View Classrooms Information") {
        viewClassInfo();
      }
      if (choices === "View Teachers Information") {
        viewTeacherInfo();
      }
      if (choices === "View All Students") {
        viewStudents();
      }
      if (choices === "View All Subjects") {
        viewSubjects();
      }
      if (choices === "View All Marks") {
        viewMarks();
      }
      if (choices === "Exit") {
        connection.end();
      }
    });
};

viewSchoolInfo = () => {
  console.log("Viewing School Information");
  const sql = `SELECT * FROM School`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewGradeInfo = () => {
  console.log("Viewing Grade Information");
  const sql = `SELECT * FROM Grade`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewClassInfo = () => {
  console.log("Viewing Classroom Information");
  const sql = `SELECT * FROM Classroom`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewTeacherInfo = () => {
  console.log("Viewing Teacher Information");
  const sql = `SELECT * FROM Teacher`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewStudents = () => {
  console.log("Viewing All Students");
  const sql = `SELECT * FROM Student`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewSubjects = () => {
  console.log("Viewing All Subjects");
  const sql = `SELECT * FROM Subject`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewMarks = () => {
  console.log("Viewing All Marks");
  const sql = `SELECT * FROM Mark`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};
