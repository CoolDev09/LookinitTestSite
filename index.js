// Function to fetch JSON data
function fetchDataFromJSON() {
    fetch('ranked_domains.json')
        .then(response => response.json())
        .then(data => {
            console.log('JSON data:', data); // Debugging

            // Process data and display search results (example)
            const searchResults = document.getElementById('searchResults');
            // Your code here to process the data and display search results
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
}

// Function to fetch CSV data
function fetchDataFromCSV() {
    fetch('random.csv')
        .then(response => response.text())
        .then(csvData => {
            console.log('CSV data:', csvData); // Debugging

            // Split CSV data by lines
            const lines = csvData.split('\n');
            // Process lines and display search results (example)
            const searchResults = document.getElementById('searchResults');
            lines.forEach(line => {
                const button = document.createElement('button');
                button.textContent = line.trim(); // Remove leading/trailing whitespace
                button.addEventListener('click', function() {
                    window.open('https://' + line.trim(), '_blank'); // Open link in new tab
                });
                searchResults.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching CSV data:', error);
        });
}

// Call functions to fetch data
fetchDataFromJSON(); // Fetch JSON data
fetchDataFromCSV(); // Fetch CSV data
