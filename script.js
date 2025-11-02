tt/* Kailine Lima 
October 29, 2025.
JavaScript Async/ Await Assignment_5 */

const searchBtn = document.getElementById('searchBtn');
const container = document.getElementById('resultsInfo');


// Make the promise 
function simulateAsyncOperation() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data fetched after waiting.");
        }, 2000);
    });
}
console.log("Before async operation");
simulateAsyncOperation()
  .then((result) => console.log( result))
  .catch((error) => console.error( error));

//
async function fetchSchoolSpeedLimits(keyword = '') {
    try{
    // Build the API URL dynamically from the form input
    let apiUrl = `https://data.winnipeg.ca/api/v3/views/k56t-9dvi/query.json` +
                 `$where=lower(text) like lower('%${keyword}%')&`
                 `$limit=100`;


    // Encode the URL to handle spaces and special characters
    const encodedURL = encodeURI(apiUrl);
    console.log(encodedURL);

    const response = await fetch(encodedURL);
    if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
    }
    // Parse JSON
    const data = await response.json();
    
    //Display the data
    displayData(data);
    setStatus(`School Speed Limit ${data.data} records successufully`, 'ok')

    } catch (error){
        console.error(`Error fetching data:`, error);
        setStatus('Failed to load data', 'error');

    }
}
    

function displayData(data) {
  const container = document.getElementById('tableContainer');
  
  if (!data){
    container.innerHTML = '<p>No data found.</p>'
    return;
  }

// Extract columns name from data
const columns = data.meta.views.columns.map(col => col.name);

//Create table header
let html = '<table><thead><tbody>';
columns.forEach(col =>{
    html += `<th>${col}<th>`;
});
html += '</th></thead><tbody>';

// Limit columns 
data.data.slice(0, 5).forEach (row => {
    html =+ '<tr>';
    row.slice(0, 3).forEach(cell => {
        html += `<td>${cell}</td>`;
    });
    html += '</tr>';
});

html += '</tbody></table>'
container.innerHTML = html;
}


document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const keyword = document.getElementById('keyword').value;
  await fetchWinnipegData(keyword);
});

// Automatically load data on page load
window.addEventListener('DOMContentLoaded', () => fetchWinnipegData());