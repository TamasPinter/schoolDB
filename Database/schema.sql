DROP DATABASE IF EXISTS SchoolDB;
CREATE DATABASE SchoolDB;

USE SchoolDB;

CREATE TABLE School (
    SchoolID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Phone VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Website VARCHAR(255) NOT NULL,
    Principal VARCHAR(255) NOT NULL,
    VicePrincipal VARCHAR(255) NOT NULL
);

CREATE TABLE Grade (
    GradeID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    GradeNumber INT,
    SchoolID INT,
   INDEX (SchoolID),
   CONSTRAINT fk_Grade_School FOREIGN KEY (SchoolID) REFERENCES School(SchoolID) ON DELETE SET NULL
);

CREATE TABLE Classroom (
    ClassroomID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    GradeNumber INT,
    INDEX (GradeNumber),
    CONSTRAINT fk_Classroom_Grade FOREIGN KEY (GradeNumber) REFERENCES Grade(GradeID) ON DELETE SET NULL
);

CREATE TABLE Teacher (
    TeacherID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    TeacherName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Phone VARCHAR(255) NOT NULL,
    GradeNumber INT,
    INDEX (GradeNumber),
    CONSTRAINT fk_Teacher_Grade FOREIGN KEY (GradeNumber) REFERENCES Grade(GradeID) ON DELETE SET NULL,
    ClassroomID INT DEFAULT 0,
    INDEX (ClassroomID),
    CONSTRAINT fk_Teacher_Classroom FOREIGN KEY (ClassroomID) REFERENCES Classroom(ClassroomID)
);

CREATE TABLE Student (
    StudentID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    StudentName VARCHAR(255) NOT NULL,
    GradeNumber INT,
    INDEX (GradeNumber),
    CONSTRAINT fk_Student_Grade FOREIGN KEY (GradeNumber) REFERENCES Grade(GradeID) ON DELETE SET NULL,
    ClassroomID INT,
    INDEX (ClassroomID),
    CONSTRAINT fk_Student_Classroom FOREIGN KEY (ClassroomID) REFERENCES Classroom(ClassroomID),
    TeacherID INT,
    INDEX (TeacherID),
    CONSTRAINT fk_Student_Teacher FOREIGN KEY (TeacherID) REFERENCES Teacher(TeacherID)

);

CREATE TABLE Subject (
    SubjectID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    SubjectName VARCHAR(255) NOT NULL
);

CREATE TABLE Mark (
    MarkID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    StudentID INT,
    INDEX (StudentID),
    CONSTRAINT fk_Mark_Student FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    SubjectID INT,
    INDEX (SubjectID),
    CONSTRAINT fk_Mark_Subject FOREIGN KEY (SubjectID) REFERENCES Subject(SubjectID),
    MarkValue INT
    
);



