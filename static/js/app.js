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
    console.log('inputElement: ', inputElement);

    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    console.log('inputValue: ', inputValue);
    
    var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
    console.log('filteredData:', filteredData);
}