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
            "View Teacher Stats",
            "View Student Information",
            "View Grade One",
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
        if (choices === "View Teacher Stats") {
          viewTeacherStats();
        }
        if (choices === "View Student Information") {
          viewStudentInformationSubMenu();
        }
        if (choices === "View Grade One") {
          viewGradeOne();
        }
        if (choices === "Exit") {
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
  const sql = `SELECT
  c.ClassroomID,
  c.GradeNumber,
  s.StudentID,
  s.StudentName,
  AVG(m.MarkValue) AS AverageMark
FROM
  Classroom c
JOIN
  Student s ON c.ClassroomID = s.ClassroomID
LEFT JOIN
  Mark m ON s.StudentID = m.StudentID
GROUP BY
  c.ClassroomID, s.StudentID
ORDER BY
  c.ClassroomID, s.StudentID`;
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

viewTeacherStats = () => {
  console.log("View Teacher Stats");
  const sql = `SELECT
  t.TeacherID,
  t.TeacherName,
  g.GradeNumber,
  sub.SubjectName,
  AVG(m.MarkValue) AS AverageMark
FROM
  Teacher t
JOIN
  Classroom c ON t.ClassroomID = c.ClassroomID
JOIN
  Grade g ON c.GradeNumber = g.GradeNumber
LEFT JOIN
  Student s ON t.TeacherID = s.TeacherID
LEFT JOIN
  Mark m ON s.StudentID = m.StudentID
LEFT JOIN
  Subject sub ON m.SubjectID = sub.SubjectID
GROUP BY
  t.TeacherID, g.GradeNumber, sub.SubjectID
ORDER BY
  t.TeacherID, g.GradeNumber, sub.SubjectID`;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

const viewStudentInformation = async () => {
  try {
    const selectedGrade = await selectGrade(connection);
    const students = await queryStudentsByGrade(selectedGrade, connection);

    // Display student information (including teacher, class, subjects, and marks)
    console.table(students);

    // Continue with other actions or return to the main menu
    mainMenu();
  } catch (error) {
    console.error(error);
    mainMenu();
  }
};

const selectGrade = async (connection) => {
  try {
    const grades = await queryAllGrades(connection);
    const gradeChoices = grades.map((grade) => ({
      name: grade.GradeNumber.toString(),
      value: grade.GradeNumber,
    }));

    const selectedGrade = await inquirer.prompt({
      type: "list",
      name: "selectedGrade",
      message: "Select a grade:",
      choices: gradeChoices,
    });

    return selectedGrade.selectedGrade;
  } catch (error) {
    throw error;
  }
};

// Add a submenu for View Student Information
const viewStudentInformationSubMenu = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "choices",
        message: "Select a grade to view student information:",
        choices: [
          "Grade 1",
          "Grade 2",
          "Grade 3",
          "Grade 4",
          "Grade 5",
          "Grade 6",
          "Grade 7",
          "Grade 8",
          "Go Back",
        ],
      },
    ]);

    const { choices } = answers;
    if (choices === "Grade 1") {
      await viewGradeOne();
    }
    if (choices === "Grade 2") {
      viewStudentInformation(2);
    }
    if (choices === "Grade 3") {
      viewStudentInformation(3);
    }
    if (choices === "Grade 4") {
      viewStudentInformation(4);
    }
    if (choices === "Grade 5") {
      viewStudentInformation(5);
    }
    if (choices === "Grade 6") {
      viewStudentInformation(6);
    }
    if (choices === "Grade 7") {
      viewStudentInformation(7);
    }
    if (choices === "Grade 8") {
      viewStudentInformation(8);
    }
    if (choices === "Go Back") {
      mainMenu();
    }
  } catch (error) {
    console.error(error);
    mainMenu();
  }
};

viewGradeOne = async () => {
  console.log("View Student Information");
  const newConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password,
    database: "SchoolDB",
  });
  try {
    newConnection.connect();

    const sql = `
        SELECT
          s.StudentID,
          s.StudentName,
          t.TeacherName,
          sub.SubjectName,
          AVG(m.MarkValue) AS AverageMark
        FROM
          Student s
          LEFT JOIN Teacher t ON s.TeacherID = t.TeacherID
          LEFT JOIN Mark m ON s.StudentID = m.StudentID
          LEFT JOIN Subject sub ON m.SubjectID = sub.SubjectID
        WHERE
          s.GradeNumber = 1
        GROUP BY
          s.StudentID, sub.SubjectID
        ORDER BY
          s.StudentID, sub.SubjectID
      `;
    const resp = await newConnection.promise().query(sql);
    console.table(resp[0]);

    // Close the connection

    mainMenu();
  } catch (err) {
    console.error(err);
  }

  // Return a resolved promise to indicate completion
  return Promise.resolve();
};
