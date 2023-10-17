import { useState } from "react";
import "./App.css";

// Main application
function App() {
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

  return (
    <div className="App">
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

// Function to calculate the letter grade given the overallGrade
function calculateLetterGrade(overallGrade) {
  if (overallGrade >= 90 && overallGrade <= 100) {
    return "A+";
  } else if (overallGrade >= 85 && overallGrade <= 89) {
    return "A";
  } else if (overallGrade >= 80 && overallGrade <= 84) {
    return "A-";
  } else if (overallGrade >= 77 && overallGrade <= 79) {
    return "B+";
  } else if (overallGrade >= 73 && overallGrade <= 76) {
    return "B";
  } else if (overallGrade >= 70 && overallGrade <= 72) {
    return "B-";
  } else if (overallGrade >= 65 && overallGrade <= 69) {
    return "C+";
  } else if (overallGrade >= 60 && overallGrade <= 64) {
    return "C";
  } else if (overallGrade >= 55 && overallGrade <= 59) {
    return "C-";
  } else if (overallGrade >= 50 && overallGrade <= 54) {
    return "D";
  } else if (overallGrade >= 0 && overallGrade <= 49) {
    return "F";
  } else {
    return "N/A";
  }
}

export default App;
