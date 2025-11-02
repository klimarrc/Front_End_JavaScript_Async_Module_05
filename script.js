/* Kailine Lima 
October 29, 2025.
JavaScript Async/ Await Assignment_5 */


const searchBtn = document.getElementById('searchBtn');
const container = document.getElementById('resultsInfo')

const getJSON = function(url, errorMsg = 'Error fetching data') {
    fetch(url).then(response => { if (!response.ok) 
        throw new Error(`${errorMsg} (Status: ${response.status})`);
      
        return response.json();
    });
};

async function fetchParkOpenSpace(commonName) {
  // Build the API URL dynamically from the form input
  const apiUrl = 'https://data.winnipeg.ca/resource/d3jk-hb6j.json?' +
                 `$where=common_name LIKE '%${commonName}%'` +
                 '&$order=diameter_at_breast_height DESC' +
                 '&$limit=100';

  // Encode the URL to handle spaces and special characters
  const encodedURL = encodeURI(apiUrl);
    getJSON(encodedURL, `Error fetching data.`)
}

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
});

