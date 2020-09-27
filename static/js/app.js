// from data.js
var tableData = data;

// Select the button
var form_button = d3.select("#filter-btn");

// Select the form
var form_date = d3.select("#form");

// Create event handlers 
form_button.on("click", runEnter);
form_date.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() 
{

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    
    var filteredData = tableData.filter(sighting => new Date(sighting.datetime).getTime() === new Date(inputValue).getTime());
    console.log('filteredData:', filteredData);

    // select the tbody element by class name
    var tableBody = d3.select(".table-body");

    tableBody.html("");
    
    // read through the filtered data and write into rows/cells of the table
    filteredData.forEach((filteredRow) => {
        var row = tableBody.append("tr");
        Object.entries(filteredRow).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
    });

};