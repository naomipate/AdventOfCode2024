// import data
const fs = require("fs");

// Read the file synchronously
const locationIds = fs.readFileSync("data.txt", "utf8");
const locationIdsArr = locationIds.trim().split(/\s+/).map(Number);
// console.log(locationIdsArr);

// sort out left and right in smallest to largest order
function sortLeftandRight() {
  const left = [locationIdsArr[0]];
  const right = [];
  for (let i = 1; i < locationIdsArr.length; i++) {
    if (i % 2 === 0) {
      left.push(locationIdsArr[i]);
    } else {
      right.push(locationIdsArr[i]);
    }
  }
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);
  return calculateDiffInLeftandRight(left, right);
}

// calculate diff in each
function calculateDiffInLeftandRight(left, right) {
  const diffs = [];
  for (let i = 0; i < left.length; i++) {
    // if (left[i] < right[i]) {
    //   diffs.push(right[i] - left[i]);
    // } else {
    //   diffs.push(left[i] - right[i]);
    // }
    let cnt = 0;
    for (let j = 0; j < right.length; j++) {
      if (left[i] === right[j]) {
        cnt += 1;
      }
    }
    diffs.push(left[i] * cnt);
  }
  return calculateTotalDiffInLeftandRight(diffs);
}

// calculate total diff
function calculateTotalDiffInLeftandRight(diffs) {
  return diffs.reduce((acc, curr) => acc + curr, 0);
}

console.log(sortLeftandRight(locationIdsArr));
