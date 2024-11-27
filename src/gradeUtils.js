function calculateLetterGrade(overallGrade) {
  if (overallGrade >= 90 && overallGrade <= 100) {
    return "A+";
  } else if (overallGrade >= 85 && overallGrade < 90) {
    return "A";
  } else if (overallGrade >= 80 && overallGrade < 85) {
    return "A-";
  } else if (overallGrade >= 77 && overallGrade < 80) {
    return "B+";
  } else if (overallGrade >= 73 && overallGrade < 77) {
    return "B";
  } else if (overallGrade >= 70 && overallGrade < 73) {
    return "B-";
  } else if (overallGrade >= 65 && overallGrade < 70) {
    return "C+";
  } else if (overallGrade >= 60 && overallGrade < 65) {
    return "C";
  } else if (overallGrade >= 55 && overallGrade < 60) {
    return "C-";
  } else if (overallGrade >= 50 && overallGrade < 55) {
    return "D";
  } else if (overallGrade >= 0 && overallGrade < 50) {
    return "F";
  } else {
    return "N/A";
  }
}

export default calculateLetterGrade;
