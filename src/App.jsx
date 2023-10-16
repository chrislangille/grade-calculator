import { useState } from "react";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([
    { courseName: "", gradePercent: "", weight: "" },
  ]);

  const [overallGrade, setOverallGrade] = useState(null);

  const handleAddCourse = () => {
    setCourses([...courses, { courseName: "", gradePercent: "", weight: "" }]);
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const calculateOverallGrade = () => {
    // Calculate the overall grade based
    const totalWeight = courses.reduce(
      (acc, course) => acc + parseFloat(course.weight || 0),
      0
    );
    const totalGrade = courses.reduce(
      (acc, course) =>
        acc +
        parseFloat(course.gradePercent || 0) * parseFloat(course.weight || 0),
      0
    );
    setOverallGrade((totalGrade / totalWeight).toFixed(2));
  };

  return (
    <div className="App">
      <h1>Grade Calculator</h1>
      {courses.map((course, index) => (
        <div key={index} className="course-row">
          <input
            type="text"
            placeholder="Course Name"
            value={course.courseName}
            onChange={(e) =>
              handleCourseChange(index, "courseName", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Grade (%)"
            value={course.gradePercent}
            onChange={(e) =>
              handleCourseChange(index, "gradePercent", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Weight (%)"
            value={course.weight}
            onChange={(e) =>
              handleCourseChange(index, "weight", e.target.value)
            }
          />
        </div>
      ))}
      <button onClick={handleAddCourse}>+</button>
      <button onClick={calculateOverallGrade}>Calculate</button>
      {overallGrade && <p>Your Overall Grade: {overallGrade}</p>}
    </div>
  );
}

export default App;
