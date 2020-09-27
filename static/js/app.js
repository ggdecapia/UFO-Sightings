// from data.js
var tableData = data;

// Select the button
var form_button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

console.log('form: ', form);

// Create event handlers 
form_button.on("click", runEnter);
form.on("submit",runEnter);

// this function is called for date input evaluation
function filterDate(sighting) {
    // Select the date input element
    var dateinputElement = d3.select("#datetime");
    var dateinputValue = dateinputElement.property("value");

    // Evaluate the date field if not empty  
    if (dateinputValue) {
      return new Date(sighting.datetime).getTime() === new Date(dateinputValue).getTime()
    } 
    // Pass true if field is empty
    else {
      return true;
    }
}

// this function is called for string input evaluation
function filterString(field, elementId) {
  // Select the string input element 
  var inputElement = d3.select(elementId);
  var inputValue = inputElement.property("value");

  // Evaluate the input field if not empty  
  if (inputValue && inputValue.trim() != '') {
    // Set both the input field and data to uppercase to account different case types
    return field.toUpperCase() === inputValue.toUpperCase();
  } 
  // Pass true if field is empty
  else {
    return true;
  }
}

// Complete the event handler function for the form
function runEnter() 
{
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Filter data based on the form input values
    var filteredData = tableData.filter(
      sighting => filterDate(sighting) && 
                  filterString(sighting.city, "#cityname") &&
                  filterString(sighting.state, "#statecode") &&
                  filterString(sighting.country, "#countrycode") &&
                  filterString(sighting.shape, "#shape")
    );

    console.log('filteredData:', filteredData);

    // select the tbody element by class name
    var tableBody = d3.select(".table-body");

    tableBody.html("");
    
    // read through the filtered data and write into rows/cells of the table
    filteredData.forEach((filteredRow) => {
        var row = tableBody.append("tr");
        Object.entries(filteredRow).forEach(([key, value]) => {
          var cell = row.append("td");
          // Convert City value to title case
          if (key === "city") {
            value = value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
          }
          // Convert State and Country values to upper case
          if (key === "state" || key === "country") {
            value = value.toUpperCase();
          }
          cell.text(value);
        });
    });

};