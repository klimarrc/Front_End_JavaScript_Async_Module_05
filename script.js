/* Kailine Lima 
October 29, 2025.
JavaScript Async/ Await Assignment_5 */


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
async function fetchSchoolSpeedLimits(keyword) {
    try{
    // Build the API URL dynamically from the form input
    const fieldName = 'key_work';  
    const kwEscaped = keyword.trim().replace(/'/g, "\\'");
    
    const baseUrl   = `https://data.winnipeg.ca/resource/k56t-9dvi.json`;
    const params = [
    `$where=lower(${fieldName}) like lower('%${kwEscaped}%')`,
    `$limit=100`
    ];
    const url = `${baseUrl}?${params.join('&')}`;
    const encodedUrl = encodeURI(url);


    // Encode the URL to handle spaces and special characters
    

    const response = await fetch(encodedUrl);
    if (!response.ok) {
        throw new Error(`Request failed ${response.status}`);
    }
    // Parse JSON
    const data = await response.json();
    console.log(data);
    } catch (error){
        console.error(`Error fetching data:`, error);
       return [];

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
  await fetchSchoolSpeedLimits(keyword);
});

// Automatically load data on page load
window.addEventListener('DOMContentLoaded', () => fetchSchoolSpeedLimits());