-- view basic school info --
select * from School;

-- view all grades --
select * from Grade;

-- view all classrooms --
select * from Classroom;

-- view all teachers --
select * from Teacher;

-- view all students --
select * from Student;

-- view all subjects --
select * from Subject;

-- view all marks --
select * from Marks;

-- view school info and join with the average mark from Marks table --
select School.*, avg(Marks.MarkValue) as avgMark
FROM School 
JOIN Grade ON School.SchoolID = Grade.SchoolID
JOIN Classroom ON Grade.GradeID = Classroom.GradeID
JOIN Teacher ON Classroom.TeacherID = Teacher.TeacherID
JOIN Student ON Classroom.ClassroomID = Student.ClassroomID
JOIN Marks ON Student.StudentID = Marks.StudentID
GROUP BY School.SchoolID;

-- view each grade with it's students and teachers --
select Grade.GradeID, Grade.GradeName, Teacher.TeacherID, Teacher.TeacherName, Student.StudentID, Student.StudentName
FROM Grade
JOIN Classroom ON Grade.GradeID = Classroom.GradeID
JOIN Teacher ON Classroom.TeacherID = Teacher.TeacherID
JOIN Student ON Classroom.ClassroomID = Student.ClassroomID
ORDER BY Grade.GradeID;

-- view each classroom with it's students and teachers --
select Classroom.ClassroomID, Classroom.GradeID, Classroom.TeacherID, Teacher.TeacherID, Teacher.TeacherName, Student.StudentID, Student.StudentName
FROM Classroom
JOIN Teacher ON Classroom.TeacherID = Teacher.TeacherID
JOIN Student ON Classroom.ClassroomID = Student.ClassroomID
ORDER BY Classroom.ClassroomID;

-- view Teacher info and their assigned grade and students with their average mark --
select Teacher.TeacherID, Teacher.TeacherName, Grade.GradeID, Grade.GradeName, Student.StudentID, Student.StudentName, avg(Marks.MarkValue) as avgMark
FROM Teacher
JOIN Classroom ON Teacher.TeacherID = Classroom.TeacherID
JOIN Grade ON Classroom.GradeID = Grade.GradeID
JOIN Student ON Classroom.ClassroomID = Student.ClassroomID
JOIN Marks ON Student.StudentID = Marks.StudentID
GROUP BY Teacher.TeacherID;

-- view Student info and their assigned classroom and teacher with their average mark --
select Student.StudentID, Student.StudentName, Classroom.ClassroomID, Classroom.GradeID, Teacher.TeacherID, Teacher.TeacherName, avg(Marks.MarkValue) as avgMark
FROM Student
JOIN Classroom ON Student.ClassroomID = Classroom.ClassroomID
JOIN Teacher ON Classroom.TeacherID = Teacher.TeacherID
JOIN Marks ON Student.StudentID = Marks.StudentID
GROUP BY Student.StudentID;

-- view all subjects and their average mark across each grade --
select Subject.SubjectID, Subject.SubjectName, avg(Marks.MarkValue) as avgMark
FROM Subject
JOIN Marks ON Subject.SubjectID = Marks.SubjectID
GROUP BY Subject.SubjectID;

-- view all subjects and their average mark across each grade and classroom --
select Subject.SubjectID, Subject.SubjectName, Grade.GradeID, Grade.GradeName, avg(Marks.MarkValue) as avgMark
FROM Subject
JOIN Marks ON Subject.SubjectID = Marks.SubjectID
JOIN Student ON Marks.StudentID = Student.StudentID
JOIN Classroom ON Student.ClassroomID = Classroom.ClassroomID
JOIN Grade ON Classroom.GradeID = Grade.GradeID
GROUP BY Subject.SubjectID, Grade.GradeID;

-- add a school --
INSERT INTO School (Name, Address, Phone, Email, Website, Principal, VicePrincipal)
VALUES ('(School Name)', '(School Address)', '(School Phone)', '(School Email)', '(School Website)', '(School Principal)', '(School Vice Principal)');

-- add a grade --
INSERT INTO Grade (GradeNumber, SchoolID)
VALUES ('(Grade Number)', '(School ID)');

-- add a classroom --
INSERT INTO Classroom (GradeID, TeacherID)
VALUES ('(Grade ID)', '(Teacher ID)');

-- add a teacher --
INSERT INTO Teacher (TeacherName, Email, Phone, ClassroomID, GradeID)
VALUES ('(Teacher Name)', '(Teacher Email)', '(Teacher Phone)', '(Classroom ID)', '(Grade ID)');

-- add a student --
INSERT INTO Student (StudentName, GradeID, ClassroomID, TeacherID)
VALUES ('(Student Name)', '(Grade ID)', '(Classroom ID)', '(Teacher ID)');

-- add a subject --
INSERT INTO Subject (SubjectName)
VALUES ('(Subject Name)');

-- add a mark --
INSERT INTO Marks (StudentID, SubjectID, MarkValue)
VALUES ('(Student ID)', '(Subject ID)', '(Mark Value)');

-- update a school --
UPDATE School
SET Name = '(School Name)', Address = '(School Address)', Phone = '(School Phone)', Email = '(School Email)', Website = '(School Website)', Principal = '(School Principal)', VicePrincipal = '(School Vice Principal)'
WHERE SchoolID = '(School ID)';

-- update a grade --
UPDATE Grade
SET GradeNumber = '(Grade Number)', SchoolID = '(School ID)'
WHERE GradeID = '(Grade ID)';

-- update a classroom --
UPDATE Classroom
SET GradeID = '(Grade ID)', TeacherID = '(Teacher ID)'
WHERE ClassroomID = '(Classroom ID)';

-- update a teacher --
UPDATE Teacher
SET TeacherName = '(Teacher Name)', Email = '(Teacher Email)', Phone = '(Teacher Phone)', ClassroomID = '(Classroom ID)', GradeID = '(Grade ID)'
WHERE TeacherID = '(Teacher ID)';

-- update a student --
UPDATE Student
SET StudentName = '(Student Name)', GradeID = '(Grade ID)', ClassroomID = '(Classroom ID)', TeacherID = '(Teacher ID)'
WHERE StudentID = '(Student ID)';

-- update a subject --
UPDATE Subject
SET SubjectName = '(Subject Name)'
WHERE SubjectID = '(Subject ID)';

-- update a mark --
UPDATE Marks
SET StudentID = '(Student ID)', SubjectID = '(Subject ID)', MarkValue = '(Mark Value)'
WHERE MarkID = '(Mark ID)';

-- delete a school --
DELETE FROM School
WHERE SchoolID = '(School ID)';

-- delete a grade --
DELETE FROM Grade
WHERE GradeID = '(Grade ID)';

-- delete a classroom --
DELETE FROM Classroom
WHERE ClassroomID = '(Classroom ID)';

-- delete a teacher --
DELETE FROM Teacher
WHERE TeacherID = '(Teacher ID)';

-- delete a student --
DELETE FROM Student
WHERE StudentID = '(Student ID)';

-- delete a subject --
DELETE FROM Subject
WHERE SubjectID = '(Subject ID)';

-- delete a mark --
DELETE FROM Marks
WHERE MarkID = '(Mark ID)';








