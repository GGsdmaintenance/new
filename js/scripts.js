/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
document.addEventListener("DOMContentLoaded", function() {
    var table = document.getElementById("scheduleTable");

    // Load saved table data from local storage
    loadTableData();

    // Event delegation to handle checkmark toggling
    table.addEventListener("click", function(event) {
        var target = event.target;
        if (target.tagName === "TD" && (target.cellIndex === 2 || target.cellIndex === 3 || target.cellIndex === 4)) {
            target.textContent = target.textContent === "✔" ? "" : "✔";
            saveTableData();
        }
    });

    // Function to add a new row
    document.getElementById("addRowButton").addEventListener("click", function() {
        addRow();
        saveTableData();
    });

    // Event delegation for delete button
    table.addEventListener("click", function(event) {
        if (event.target.classList.contains("deleteRowButton")) {
            deleteRow(event.target);
        }
    });
});

function saveTableData() {
    var table = document.getElementById("scheduleTable");
    var rows = table.rows;
    var data = [];

    // Loop through rows and cells to store content
    for (var i = 0; i < rows.length; i++) {
        var row = [];
        for (var j = 0; j < rows[i].cells.length - 1; j++) { // -1 to skip the delete button column
            row.push(rows[i].cells[j].textContent);
        }
        data.push(row);
    }

    // Save the data array to local storage
    localStorage.setItem("tableData", JSON.stringify(data));
}

function loadTableData() {
    var table = document.getElementById("scheduleTable");
    var data = JSON.parse(localStorage.getItem("tableData"));

    if (data) {
        for (var i = 0; i < data.length; i++) {
            if (table.rows[i]) {
                for (var j = 0; j < data[i].length; j++) {
                    table.rows[i].cells[j].textContent = data[i][j];
                }
            } else {
                addRow(data[i]);
            }
        }
    }
}

function addRow(rowData = []) {
    var table = document.getElementById("scheduleTable");
    var newRow = table.insertRow(-1);
    var colCount = table.rows[0].cells.length;

    for (var i = 0; i < colCount; i++) {
        var newCell = newRow.insertCell(i);
        newCell.contentEditable = "true";
        newCell.textContent = rowData[i] || "";

        // Add click event listener for checkmark functionality for Week 1, 2, and 3 columns
        if (i === 2 || i === 3 || i === 4) {
            newCell.addEventListener("click", function() {
                this.textContent = this.textContent === "✔" ? "" : "✔";
                saveTableData();
            });
        }
    }

    // Add a delete button in the last cell of the row
    var deleteCell = newRow.insertCell(-1);
    deleteCell.innerHTML = '<button class="deleteRowButton">Delete</button>';
}

function deleteRow(button) {
    var row = button.closest("tr");
    row.remove();
    saveTableData();
}
