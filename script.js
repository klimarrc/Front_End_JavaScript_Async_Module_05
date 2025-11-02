/* Kailine Lima 
October 29, 2025.
JavaScript Async/ Await Assignment_5 */


const searchBtn = document.getElementById('searchBtn');
const container = document.getElementById('resultsInfo')

async function fetchParkOpenSpace(commonName) {
  // Build the API URL dynamically from the form input
  const apiUrl = 'https://data.winnipeg.ca/resource/d3jk-hb6j.json?' +
                 `$where=common_name LIKE '%${commonName}%'` +
                 '&$order=diameter_at_breast_height DESC' +
                 '&$limit=100';

  // Encode the URL to handle spaces and special characters
  const encodedURL = encodeURI(apiUrl);

  try {
    // Fetch the data from the Open Data API
    const response = await fetch(encodedURL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();
    console.log(data); 
    return data;
  } catch (error) {
    console.error('Error fetching tree data:', error);
  }
}

fetchParkOpenSpace().then((parks) => console.log(parks));

searchBtn.addEventListener("click", async () => {
    try {
        const data = await fetchParkOpenSpace();
        container.innerHTML = '';
        data.forEach((item, i) => {
            const p = document.createElement('p');
            p.textContent = `Open park ${i + 1}: ${item}`;
            container.appendChild(p);
        });
    } catch (error) {
        container.innerHTML = "Error loading data.";
    }
// duplicate/undefined listener removed
    getParkOpenSpace();
});

const request = fetch('https://data.winnipeg.ca/api/v3/views/iibp-28fx/query.json')
console.log(request)
