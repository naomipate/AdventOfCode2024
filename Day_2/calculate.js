// import data
const fs = require("fs");

// Read the file synchronously
const reports = fs.readFileSync("data.txt", "utf8");
const reportsArr = reports
  .trim()
  .split("\n")
  .map((line) => line.trim().split(/\s+/).map(Number));
// console.log(reportsArr);

// calculate reports
function calulateSafeReports(reportsArr) {
  let safeReports = 0;
  for (let i = 0; i < reportsArr.length; i++) {
    let cnt = 0;

    for (let j = 1; j < reportsArr[i].length - 1; j++) {
      // check if reports are just increasing or decreasing on both sides of each level
      if (
        reportsArr[i][j - 1] > reportsArr[i][j] &&
        reportsArr[i][j] > reportsArr[i][j + 1] &&
        reportsArr[i][j - 1] - reportsArr[i][j] <= 3 &&
        reportsArr[i][j] - reportsArr[i][j + 1] <= 3
      ) {
        cnt += 1;
      } else if (
        reportsArr[i][j + 1] > reportsArr[i][j] &&
        reportsArr[i][j] > reportsArr[i][j - 1] &&
        reportsArr[i][j + 1] - reportsArr[i][j] <= 3 &&
        reportsArr[i][j] - reportsArr[i][j - 1] <= 3
      ) {
        cnt += 1;
      }
    }

    if (cnt === reportsArr[i].length - 2) {
      safeReports += 1;
    }
  }
  return safeReports;
}

console.log(calulateSafeReports(reportsArr));
