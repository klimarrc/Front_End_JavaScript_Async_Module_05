/* Kailine Lima 
October 29, 2025.
JavaScript Async/ Await Assignment_5 */
// 
 
async function fetchSchoolSpeedLimits(keyword) {
    try {
        word = (keyword ?? '').trim();
        if (!word) return [];

        const base = 'https://data.winnipeg.ca/resource/k56t-9dvi.json';
        const url = `${base}?$q=${encodeURIComponent(word)}&$limit=20`;

        document.getElementById('status').textContent = 'Loading...';
        console.log('API URL:', url);

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP: ${response.status}`);

        const data = await response.json();
        document.getElementById('status').textContent = `Found ${data.length} records.`;
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('status').textContent = 'Error fetching data.';
        return [];
      }
    }

    function renderTable(data) {
      const container = document.getElementById('results');
      if (!data.length) {
        container.innerHTML = '<p>No results found.</p>';
        return;
      }

      const rows = data.map(row => `
        <tr>
          <td>${row.street_name ?? ''}</td>
          <td>${row.school ?? ''}</td>
          <td>${row.speed_limit ?? ''}</td>
          <td>${row.effective_days ?? ''}</td>
          <td>${row.effective_time ?? ''}</td>
          <td><a href="${row.legislation_link ?? '#'}" target="_blank">Link</a></td>
        </tr>
      `).join('');

      container.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Street Name</th>
              <th>School</th>
              <th>Speed Limit</th>
              <th>Days</th>
              <th>Time</th>
              <th>Legislation</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    document.getElementById('searchForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const keyword = document.getElementById('keyword').value;
      const data = await fetchSchoolSpeedLimits(keyword);
      renderTable(data);
    });