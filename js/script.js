/* File: script.js
GUI Assignment: Creating Dynamic table
Dhruvkumar Patel, UMass Lowell Computer Science, Dhruvkumar_patel1@student.uml.edu
Copyright (c) 2025 by Dhruvkumar. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by DP on 10/29, 2025
Description: In this file it reads the user inputs, check for errors, and builts
the multiplication table using the insert row and stuff. Check all the errors for min and max of the
row/column and give errors without any popup, took help from the w3school to generate dynamic Table.
citation:
Table creation references
 https://www.w3schools.com/jsref/met_table_insertrow.asp 
 https://www.w3schools.com/jsref/met_table_createthead.asp
 https://www.w3schools.com/jsref/met_node_appendchild.asp

*/
// Global constants
var MIN = -50;
var MAX = 50;
var MAX_CELLS = 200 * 200;

// Main function triggered by button
function calc_tab() {

  var status = document.getElementById("status");
  var grid = document.getElementById("grid");

  // Clear previous message and tables
  status.className = "";
  status.textContent = "";
  grid.innerHTML = "";
  // Errors message for any wrong input or fields are empty
  try {
    if (
      document.getElementById("minCol").value == "" ||
      document.getElementById("maxCol").value == "" ||
      document.getElementById("minRow").value == "" ||
      document.getElementById("maxRow").value == ""
    ) {
      throw "Please fill in all four boxes"
    }

  // Read values as numbers
  var minCol = Number(document.getElementById("minCol").value);
  var maxCol = Number(document.getElementById("maxCol").value);
  var minRow = Number(document.getElementById("minRow").value);
  var maxRow = Number(document.getElementById("maxRow").value);

  console.log("Minimum Column:", minCol);
  console.log("Maximum Column:", maxCol);
  console.log("Minimum Row:", minRow);
  console.log("Maximum Row:", maxRow);

  if (isNaN(minCol) || isNaN(maxCol) || isNaN(minRow) || isNaN(maxRow)) {
    throw "Please enter valid numbers only."
  }

  if (minCol < MIN || minCol > MAX || maxCol < MIN || maxCol > MAX || minRow < MIN || minRow > MAX || maxRow < MIN || maxRow > MAX) {
    throw "Values must be between -50 to 50"
  }

  if (minCol > maxCol) throw "Minimum Column cannot be greater than maximum Column.";
  if (minRow > maxRow) throw "Minimum Row cannot be greater than maximum Row.";

  // Total cells for performaces
  var cols = maxCol - minCol + 1;
  var rows = maxRow - minRow + 1;
  var total = rows * cols;
 // preventing the page from becoming unresponsive
  if (total > MAX_CELLS) {
    throw "Range too large for cells. Please reduce the values.";
    }
  // Create table head
  var thead = grid.createTHead();
  var headRow = thead.insertRow();

  // Top-left corner cell
  var corner = document.createElement("th");
  corner.textContent = "";
  headRow.appendChild(corner);

  // Add column headers
  for (var c = minCol; c <= maxCol; c++) {
    var th = document.createElement("th");
    th.textContent = c;
    headRow.appendChild(th);
  }

  // Create table body
  var tbody = grid.createTBody();

  // Generate multiplication rows
  for (var r = minRow; r <= maxRow; r++) {
    var tr = tbody.insertRow();

    // Add row header
    var thLeft = document.createElement("th");
    thLeft.textContent = r;
    tr.appendChild(thLeft);

    // Add product cells
    for (var c2 = minCol; c2 <= maxCol; c2++) {
      var td = tr.insertCell();
      td.textContent = r * c2;
    }
  }

  status.className = "ok";
  status.textContent = "Table Generated Successfully!";
} catch (err) {
  // handles errors gracefully without popup
  status.className = "err";
  status.textContent = "Error: " + err;
  grid.innerHTML = "";
}
  return false; // prevent from refreshing the page
}