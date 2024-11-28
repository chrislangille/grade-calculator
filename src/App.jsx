import { useState, useEffect } from "react";
import "./App.css";
import calculateLetterGrade from "./gradeUtils";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

// Main application
function App() {
  // Loading state
  const [loading, setLoading] = useState(true);

  const [assignments, setAssignments] = useState([
    { assignName: "", gradePercent: "", weight: "" },
  ]);

  const [overallGrade, setOverallGrade] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Add a new assignment
  const handleAddAssignment = () => {
    setAssignments([
      ...assignments,
      { assignName: "", gradePercent: "", weight: "" },
    ]);
  };

  // Remove the last assignment added
  const handleRemoveAssignment = () => {
    if (assignments.length > 1) {
      const updatedAssignments = [...assignments];
      updatedAssignments.pop();
      setAssignments(updatedAssignments);
    }
  };

  const handleAssignmentChange = (index, field, value) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index][field] = value;
    setAssignments(updatedAssignments);
  };

  const calculateOverallGrade = () => {
    // Calculate the overall grade based
    const totalWeight = assignments.reduce(
      (acc, course) => acc + parseFloat(course.weight || 0),
      0,
    );
    const totalGrade = assignments.reduce(
      (acc, course) =>
        acc +
        parseFloat(course.gradePercent || 0) * parseFloat(course.weight || 0),
      0,
    );

    const calculatedGrade = (totalGrade / totalWeight).toFixed(2);

    if (isNaN(calculatedGrade)) {
      setOverallGrade(null);
      setShowErrorMessage(true);
    } else {
      setOverallGrade(calculatedGrade);
      setShowErrorMessage(false);
    }
  };

  // Essentially refresh the page
  const handleRestart = () => {
    // Reset the assignments and overallGrade states
    setAssignments([{ assignName: "", gradePercent: "", weight: "" }]);
    setOverallGrade(null);
    // Hide the error message if present
    setShowErrorMessage(false);
  };

  // Simulate loading delay with useEffect
  useEffect(() => {
    setTimeout(() => {
      // Set loading to false after a delay (simulating loading time)
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    // Display loading screen
    return (
      <div className="App">
        <div className="background-animation"></div>
        <h1>Grade Calculator</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="Calc">
        <div className="background-animation"></div>
        <h1>Grade Calculator</h1>
        <p className="disclaimer">
          Based on the{" "}
          <a href="https://www.dal.ca/campus_life/academic-support/grades-and-student-records/grade-scale-and-definitions.html">
            Dalhousie University
          </a>{" "}
          grade scale
        </p>
        {assignments.map((course, index) => (
          <div key={index} className="course-row">
            <input
              type="text"
              placeholder="Assignment Name"
              value={course.assignName}
              onChange={(e) =>
                handleAssignmentChange(index, "assignName", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Grade (%)"
              value={course.gradePercent}
              onChange={(e) =>
                handleAssignmentChange(index, "gradePercent", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Weight (%)"
              value={course.weight}
              onChange={(e) =>
                handleAssignmentChange(index, "weight", e.target.value)
              }
            />
          </div>
        ))}
        <button onClick={handleAddAssignment}>+</button>
        <button onClick={handleRemoveAssignment}>-</button>
        <button onClick={calculateOverallGrade}>Calculate</button>
        <button onClick={handleRestart}>Reset</button>
        {showErrorMessage ? (
          <p className="output-paragraph">Please check your input.</p>
        ) : (
          overallGrade !== null && (
            <div>
              <p className="output-paragraph">
                Your Overall Grade: {overallGrade} %
              </p>
              <p className="output-paragraph">
                Your Letter Grade: {calculateLetterGrade(overallGrade)}
              </p>
            </div>
          )
        )}
      </div>

      <footer className="footer">
        <p>© 2024 Grade Calculator. All Rights Reserved.</p>
        <div>
          <a
            className="social-icons"
            href="https://www.linkedin.com/in/chris-langille-5943b8235/"
            target="_blank"
          >
            <FaLinkedin size={30} color="#648de5" />
          </a>
          <a
            className="social-icons"
            href="https://github.com/chrislangille"
            target="_blank"
          >
            <FaGithub size={30} color="#648de5" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
