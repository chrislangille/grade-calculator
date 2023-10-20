import { useState, useEffect } from "react";
import "./App.css";
import calculateLetterGrade from "./gradeUtils";

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
      0
    );
    const totalGrade = assignments.reduce(
      (acc, course) =>
        acc +
        parseFloat(course.gradePercent || 0) * parseFloat(course.weight || 0),
      0
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
        <h1>Grade Calculator</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="background-animation"></div>
      <h1>Grade Calculator</h1>
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
      <button onClick={handleRestart}>Restart</button>
      {showErrorMessage ? (
        <p>Please check your input.</p>
      ) : (
        overallGrade !== null && (
          <div>
            <p>Your Overall Grade: {overallGrade} %</p>
            <p>Your Letter Grade: {calculateLetterGrade(overallGrade)}</p>
          </div>
        )
      )}
    </div>
  );
}

export default App;
