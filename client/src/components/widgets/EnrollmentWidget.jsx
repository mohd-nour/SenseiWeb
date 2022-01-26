import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import { useSelector, useDispatch } from "react-redux";
import { getStudents, addStudent, setCurrentCourse } from "../../actions/courses";
import swal from "sweetalert";
import io from "socket.io-client";
const socket = io();

var createStudentCardWrapped = function (courseIdParam) {
  return function createStudentCard(student) {
    if (student) {
      return (
        <StudentCard
          key={student._id}
          id={student.instituteId}
          courseId={courseIdParam}
          name={student.name}
          mode="Normal"
        />
      );
    }
  };
};


function EnrollmentWidget() {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students);

  const [studentData, setStudentData] = useState({
    studentId: "",
  });
  const {courseId, courseName, courseNumber} = useSelector((state) => state.currentCourse);

  useEffect(() => {
    socket.emit("ListenToEnrollment", courseId);
    socket.on("Enrollment", () => {
      console.log("Added student enrollment");
      dispatch(getStudents(courseId));
    });
  }, [courseId, dispatch]);

  // if there are no students with an id equal to state, add student

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentData.studentId !== "" && studentData.studentId.length === 9) {
      if (
        students.filter(
          (student) => student.instituteId === studentData.studentId
        ).length === 0
      ) {
        
        dispatch(addStudent(courseId, studentData.studentId));
      } else {
        swal("Student is already enrolled!", { icon: "warning" });
      }
    } else {
      swal("Invalid Entry", { icon: "warning" });
    }
  };

  return (
    <div className="primary-container">
      <div className="dash-container">
        <div id="lower-section">
          <h1 className="title">
            Student Enrolment -
            {" " + courseName + " " + courseNumber}
          </h1>
          <div id="card-section">
            {students.map(createStudentCardWrapped(courseId))}
          </div>
        </div>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="addStudent-column">
          <h3 id="form-title">Add Student</h3>
          <label>Student ID</label>
          <input
            name="studentId"
            placeholder="ex: 2021XXXXX"
            id="studentId"
            className="addClass-input"
            value={studentData.studentId}
            onChange={(e) =>
              setStudentData({
                ...studentData,
                studentId: e.target.value,
              })
            }
          ></input>
          <button type="submit" className="save-button">
            Add
          </button>
          <button className="clear-button">Clear</button>
        </div>
      </form>
    </div>
  );
}

export default EnrollmentWidget;
