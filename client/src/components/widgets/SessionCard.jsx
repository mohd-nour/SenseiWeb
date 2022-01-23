import React from "react";
import { useDispatch } from "react-redux";
import { removeSession, setSingleSession } from "../../actions/courses";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";


function SessionCard(props) {
  const dispatch = useDispatch();
  const {courseId} = useSelector((state) => state.currentCourse);
  const loadStudentsInSession = () => {
    console.log("Setting current session with "+courseId+" and "+props.sessionNumber);
    dispatch(setSingleSession(courseId, props.sessionNumber));
    console.log("Current session has been set");
  };

  return (
    <div className="card-container">
      <div className="class-card" onMouseEnter={loadStudentsInSession}>
          <Link to={"/Attendance/"+props.sessionNumber}>
            <div className="session-link" >
              <h3 >Session {props.sessionNumber}</h3>
            </div>
          </Link>
        <button
          onClick={() => {
            swal("Are you sure you would like to delete this course?", {
              buttons: {
                cancel: {
                  text: "Cancel",
                  value: false,
                  visible: true,
                },
                confirm: {
                  text: "Yes",
                  value: true,
                  visible: true,
                },
              },
            }).then((value) => {
              if (value) {
                dispatch(
                  removeSession(courseId, props.sessionNumber)
                );
              }
            });
          }}
          className="uil uil-trash delete-icon"
        ></button>
        <div></div>
      </div>
    </div>
  );
}

export default SessionCard;
