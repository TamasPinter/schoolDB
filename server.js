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
            "View Information",
            "Add An Item",
            "Update an Item",
            "Exit\n",
          ],
          pageSize: 15,
        },
      ])
      .then((answers) => {
        const { choices } = answers;
        if (choices === "View Information") {
          viewItemSubMenu();
        }
        if (choices === "Add An Item") {
          addItemSubMenu();
        }
        if (choices === "Update an Item") {
          updateItemSubMenu();
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
      viewGradeTwo();
    }
    if (choices === "Grade 3") {
      viewGradeThree();
    }
    if (choices === "Grade 4") {
      viewGradeFour();
    }
    if (choices === "Grade 5") {
      viewGradeFive();
    }
    if (choices === "Grade 6") {
      viewGradeSix();
    }
    if (choices === "Grade 7") {
      viewGradeSeven();
    }
    if (choices === "Grade 8") {
      viewGradeEight();
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
  console.log("View Grade One Students");
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
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewGradeTwo = async () => {
  console.log("View Grade Two Students");
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
  s.GradeNumber = 2
  GROUP BY
  s.StudentID, sub.SubjectID
  ORDER BY
  s.StudentID, sub.SubjectID
  `;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewGradeThree = async () => {
  console.log("View Grade Three Students");
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
  s.GradeNumber = 3
  GROUP BY
  s.StudentID, sub.SubjectID
  ORDER BY
  s.StudentID, sub.SubjectID
  `;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewGradeFour = async () => {
  console.log("View Grade Four Students");
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
  s.GradeNumber = 4
  GROUP BY
  s.StudentID, sub.SubjectID
  ORDER BY
  s.StudentID, sub.SubjectID
  `;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewGradeFive = async () => {
  console.log("View Grade Five Students");
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
  s.GradeNumber = 5
  GROUP BY
  s.StudentID, sub.SubjectID
  ORDER BY
  s.StudentID, sub.SubjectID
  `;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewGradeSix = async () => {
  console.log("View Grade Six Students");
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
  s.GradeNumber = 6
  GROUP BY
  s.StudentID, sub.SubjectID
  ORDER BY
  s.StudentID, sub.SubjectID
  `;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewGradeSeven = async () => {
  console.log("View Grade Seven Students");
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
  s.GradeNumber = 7
  GROUP BY
  s.StudentID, sub.SubjectID
  ORDER BY
  s.StudentID, sub.SubjectID
  `;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewGradeEight = async () => {
  console.log("View Grade Eight Students");
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
  s.GradeNumber = 8
  GROUP BY
  s.StudentID, sub.SubjectID
  ORDER BY
  s.StudentID, sub.SubjectID
  `;
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    console.table(resp);
    mainMenu();
  });
};

viewItemSubMenu = async () => {
  try {
    const answers = await inquirer
      .prompt([
        {
          type: "list",
          name: "choices",
          message: "Select a field to view",
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
            "Go Back",
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
        if (choices === "Go Back") {
          mainMenu();
        }
      });
  } catch (error) {
    console.error(error);
    mainMenu();
  }
};

addItemSubMenu = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "choices",
        message: "Select a field to Add to",
        choices: [
          "Add A School",
          "Add A Grade",
          "Add A Classroom",
          "Add A Teacher",
          "Add A Student",
          "Add A Subject",
          "Add A Mark",
          "Go Back",
        ],
      },
    ]);

    const { choices } = answers;
    if (choices === "Add A School") {
      addSchool();
    }
    if (choices === "Add A Grade") {
      addGrade();
    }
    if (choices === "Add A Classroom") {
      addClassroom();
    }
    if (choices === "Add A Teacher") {
      addTeacher();
    }
    if (choices === "Add A Student") {
      addStudent();
    }
    if (choices === "Add A Subject") {
      addSubject();
    }
    if (choices === "Add A Mark") {
      addMark();
    }
    if (choices === "Go Back") {
      maunMenu();
    }
  } catch (error) {
    console.error(error);
    mainMenu();
  }
};

addSchool = () => {
  console.log("Adding a New School ..\n");
  const sql = `INSERT INTO School (Name, Address, Phone, Email, Website, Principal, VicePrincipal) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  inquirer
    .prompt([
      {
        type: "input",
        name: "Name",
        message: "What is the name of the school?",
      },
      {
        type: "input",
        name: "Address",
        message: "What is the address?",
      },
      {
        type: "input",
        name: "Phone",
        message: "What is the phone number?",
      },
      {
        type: "input",
        name: "Email",
        message: "What is the school email?",
      },
      {
        type: "input",
        name: "Website",
        message: "What is the school website?",
      },
      {
        type: "input",
        name: "Principal",
        message: "What is the Principal's name?",
      },
      {
        type: "input",
        name: "VicePrincipal",
        message: "What is the Vice Principal's name?",
      },
    ])
    .then((answers) => {
      const { Name, Address, Phone, Email, Website, Principal, VicePrincipal } =
        answers;
      connection.query(
        sql,
        [Name, Address, Phone, Email, Website, Principal, VicePrincipal],
        (err, resp) => {
          if (err) throw err;
          console.log("New School Added");
          viewSchoolInfo();
        }
      );
    });
};

addGrade = () => {
  console.log("Adding a New Grade ..\n");
  const sql = `INSERT INTO Grade (GradeNumber, SchoolID) VALUES (?, ?)`;
  inquirer
    .prompt([
      {
        type: "input",
        name: "GradeNumber",
        message: "What Grade are you adding?",
      },
      {
        type: "input",
        name: "SchoolID",
        message: "What is the SchoolID this Grade belongs to?",
      },
    ])
    .then((answers) => {
      const { GradeNumber, SchoolID } = answers;
      connection.query(sql, [GradeNumber, SchoolID], (err, resp) => {
        if (err) throw err;
        console.log("New Grade Added");
        viewGradeInfo();
      });
    });
};

addClassroom = () => {
  console.log("Adding a New Classroom ..\n");
  const sql = `INSERT INTO Classroom (GradeNumber) VALUES (?)`;
  inquirer
    .prompt([
      {
        type: "input",
        name: "GradeNumber",
        message: "What grade is in this Classroom?",
      },
    ])
    .then((answers) => {
      const { GradeNumber } = answers;
      connection.query(sql, [GradeNumber], (err, resp) => {
        if (err) throw err;
        console.log("New Classroom Added");
        viewClassInfo();
      });
    });
};

addTeacher = () => {
  console.log("Adding a New Teacher ..\n");
  const sql = `INSERT INTO Teacher (TeacherName, Email, Phone, GradeNumber) VALUES (?, ?, ?, ?)`;
  inquirer
    .prompt([
      {
        type: "input",
        name: "TeacherName",
        message: "What is the Teacher's name?",
      },
      {
        type: "input",
        name: "Email",
        message: "What is the Teacher's email?",
      },
      {
        type: "input",
        name: "Phone",
        message: "What is the Teacher's Phone Number?",
      },
      {
        type: "input",
        name: "GradeNumber",
        message: "What Grade is the Teacher teaching?",
      },
    ])
    .then((answers) => {
      const { TeacherName, Email, Phone, GradeNumber } = answers;
      connection.query(
        sql,
        [TeacherName, Email, Phone, GradeNumber],
        (err, resp) => {
          if (err) throw err;
          console.log("New Teacher Added");
          viewTeacherInfo();
        }
      );
    });
};

addStudent = () => {
  console.log("Adding a New Student ..\n");
  const sql = `INSERT INTO Student (StudentName, GradeNumber, ClassroomID, TeacherID) VALUES (?, ?, ?, ?)`;
  inquirer
    .prompt([
      {
        type: "input",
        name: "StudentName",
        message: "What is the Student's name?",
      },
      {
        type: "input",
        name: "GradeNumber",
        message: "What Grade is the student in?",
      },
      {
        type: "input",
        name: "ClassroomID",
        message: "What Classroom is the student in?",
      },
      {
        type: "input",
        name: "TeacherID",
        message: "Which teacher is the student assidned to? (TeacherID)",
      },
    ])
    .then((answers) => {
      const { StudentName, GradeNumber, ClassroomID, TeacherID } = answers;
      connection.query(
        sql,
        [StudentName, GradeNumber, ClassroomID, TeacherID],
        (err, resp) => {
          if (err) throw err;
          console.log("New Student Added");
          viewStudents();
        }
      );
    });
};

addSubject = () => {
  console.log("Adding a New Subject ..\n");
  const sql = `INSERT INTO Subject (SubjectName) VALUES (?)`;
  inquirer
    .prompt([
      {
        type: "input",
        name: "SubjectName",
        message: "What Subject is being added?",
      },
    ])
    .then((answers) => {
      const { SubjectName } = answers;
      connection.query(sql, [SubjectName], (err, resp) => {
        if (err) throw err;
        console.log("New Subject Added");
        viewSubjects();
      });
    });
};

addMark = () => {
  console.log("Adding a New Mark ..\n");
  const sql = `INSERT INTO Mark (StudentID, SubjectID, MarkValue) VALUES (?, ?, ?)`;
  inquirer
    .prompt([
      {
        type: "input",
        name: "StudentID",
        message: "What is the StudentID?",
      },
      {
        type: "input",
        name: "SubjectID",
        message: "What is the SubjectID for this mark?",
      },
      {
        type: "input",
        name: "MarkValue",
        message: "What is the Mark? (0-100)",
      },
    ])
    .then((answers) => {
      const { StudentID, SubjectID, MarkValue } = answers;
      connection.query(sql, [StudentID, SubjectID, MarkValue], (err, resp) => {
        if (err) throw err;
        console.log("New Mark Added");
        viewMarks();
      });
    });
};

updateItemSubMenu = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "choices",
        message: "Select a field to Update",
        choices: [
          "Update A School",
          "Update A Grade",
          "Update A Classroom",
          "Update A Teacher",
          "Update A Student",
          "Update A Subject",
          "Update A Mark",
          "Go Back",
        ],
      },
    ]);
    const { choices } = answers;
    if (choices === "Update A School") {
      updateSchool();
    }
    if (choices === "Update A Grade") {
      updateGrade();
    }
    if (choices === "Update A Classroom") {
      updateClassroom();
    }
    if (choices === "Update A Teacher") {
      updateTeacher();
    }
    if (choices === "Update A Student") {
      updateStudent();
    }
    if (choices === "Update A Subject") {
      updateSubject();
    }
    if (choices === "Update A Mark") {
      updateMark();
    }
    if (choices === "Go Back") {
      mainMenu();
    }
  } catch (error) {
    console.error(error);
    mainMenu();
  }
};

updateSchool = () => {
  console.log("Updating a School ..\n");
  const schoolsql = `SELECT * FROM School`;
  connection.query(schoolsql, (err, resp) => {
    if (err) throw err;
    const schools = resp.map(({ SchoolID, Name }) => ({
      name: Name,
      value: SchoolID,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "selected_school_SchoolID",
          message: "Which School would you like to update?",
          choices: schools,
        },
      ])
      .then((answers) => {
        const { selected_school_SchoolID } = answers;
        const selectedSchool = resp.find(
          (school) => school.SchoolID === selected_school_SchoolID
        );

        const updateFields = [
          selectedSchool.Name && "Name = ?",
          selectedSchool.Address && "Address = ?",
          selectedSchool.Phone && "Phone = ?",
          selectedSchool.Email && "Email = ?",
          selectedSchool.Website && "Website = ?",
          selectedSchool.Principal && "Principal = ?",
          selectedSchool.VicePrincipal && "VicePrincipal = ?",
        ]
          .filter(Boolean)
          .join(", ");

        const sql = `UPDATE School SET ${updateFields} WHERE SchoolID = ?`;

        const values = [];
        if (selectedSchool.Name) values.push(selectedSchool.Name);
        if (selectedSchool.Address) values.push(selectedSchool.Address);
        if (selectedSchool.Phone) values.push(selectedSchool.Phone);
        if (selectedSchool.Email) values.push(selectedSchool.Email);
        if (selectedSchool.Website) values.push(selectedSchool.Website);
        if (selectedSchool.Principal) values.push(selectedSchool.Principal);
        if (selectedSchool.VicePrincipal)
          values.push(selectedSchool.VicePrincipal);
        values.push(selectedSchool.SchoolID);

        inquirer
          .prompt([
            {
              type: "input",
              name: "Name",
              message: "What is the name of the school?",
            },
            {
              type: "input",
              name: "Address",
              message: "What is the Address?",
            },
            {
              type: "input",
              name: "Phone",
              message: "What is the Phone Number?",
            },
            {
              type: "input",
              name: "Email",
              message: "What is the Email?",
            },
            {
              type: "input",
              name: "Website",
              message: "What is the school website?",
            },
            {
              type: "input",
              name: "Principal",
              message: "What is the Principal's name?",
            },
            {
              type: "input",
              name: "VicePrincipal",
              message: "What is the Vice Principal's name?",
            },
          ])
          .then((answers) => {
            const {
              Name,
              Address,
              Phone,
              Email,
              Website,
              Principal,
              VicePrincipal,
            } = answers;
            connection.query(
              sql,
              [
                Name || selectedSchool.Name,
                Address || selectedSchool.Address,
                Phone || selectedSchool.Phone,
                Email || selectedSchool.Email,
                Website || selectedSchool.Website,
                Principal || selectedSchool.Principal,
                VicePrincipal || selectedSchool.VicePrincipal,
                selectedSchool.SchoolID,
              ],
              (err, resp) => {
                if (err) throw err;
                console.log("School Updated");
                viewSchoolInfo();
              }
            );
          });
      });
  });
};
