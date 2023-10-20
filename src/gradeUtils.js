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

export default calculateLetterGrade;
