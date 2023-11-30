const cTable = require("console.table");
const mysql = require("mysql2");
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

const mainMenu = async () => {
  try {
    const answers = await inquirer
      .prompt([
        {
          type: "list",
          name: "choices",
          message:
            "Welcome to the School Database! What would you like to do today?\n",
          choices: [
            "View School Information",
            "View Grade Information",
            "View Average Per Grade",
            "View Classrooms Information",
            "View Teachers Information",
            "View All Students",
            "View All Subjects",
            "View All Marks",
            "Exit\n",
          ],
          pageSize: 15,
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
        if (choices === "View Average Per Grade") {
          viewAveragePerGrade();
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
        } else {
          console.log("Invalid Option");
          connection.end();
        }
      });
  } catch (err) {
    console.log(err);
    mainMenu();
  }
};

viewSchoolInfo = () => {
  console.log("View School Information");
  const sql = `SELECT * FROM school`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewGradeInfo = () => {
  console.log("View Grade Information");
  const sql = `SELECT * FROM Grade`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewAveragePerGrade = () => {
  console.log("View Average Per Grade");
  const sql = `SELECT GradeID, AVG(Mark) AS Average FROM Mark GROUP BY GradeID`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewClassInfo = () => {
  console.log("View Classroom Information");
  const sql = `SELECT * FROM Classroom`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewTeacherInfo = () => {
  console.log("View Teacher Information");
  const sql = `SELECT * FROM Teacher`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewStudents = () => {
  console.log("View All Students");
  const sql = `SELECT * FROM Student`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewSubjects = () => {
  console.log("View All Subjects");
  const sql = `SELECT * FROM Subject`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewMarks = () => {
  console.log("View All Marks");
  const sql = `SELECT * FROM Mark`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};
