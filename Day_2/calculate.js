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
    let reportLength = reportsArr[i].length;
    for (let j = 1; j < reportLength - 1; j++) {
      // check if reports are just increasing or decreasing on both sides of each level

      // Day 2 part 2 - make a case for removing one bad level like going from
      // 1 3 2 4 5 to 1 2 4 5 by removing the 3 and creating a safe increase
      // 1 2 4 4 5 to 1 2 4 5 by removing the extra 4 that keeps it from being a safe increase

      // checking if report length is the same as before so we only change it by one.
      if (reportLength === reportsArr[i].length) {
        if (
          // increase to decrease
          (reportsArr[i][j - 1] <= reportsArr[i][j] && // increase
            reportsArr[i][j] >= reportsArr[i][j + 1] && // decrease
            reportsArr[i][j] - reportsArr[i][j - 1] <= 3 &&
            reportsArr[i][j] - reportsArr[i][j + 1] <= 3) ||
          // decrease to increase
          (reportsArr[i][j - 1] >= reportsArr[i][j] && // decrease
            reportsArr[i][j] <= reportsArr[i][j + 1] && // increase
            reportsArr[i][j - 1] - reportsArr[i][j] <= 3 &&
            reportsArr[i][j + 1] - reportsArr[i][j] <= 3)
        ) {
          // remove j from reportsArr[i] by splicing the array at j
          reportsArr[i].splice(j, 1);
          j--;
        }
      }

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
