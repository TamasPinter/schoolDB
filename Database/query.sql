-- view basic school info --
select * from School;

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





