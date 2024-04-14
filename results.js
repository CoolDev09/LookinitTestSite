// Function to fetch data from CSV file and filter based on relevance to search query
function fetchDataFromCSV(query) {
    return new Promise((resolve, reject) => {
        fetch('final_15million.csv') // Adjust the file name accordingly
            .then(response => response.text())
            .then(csvData => {
                // Split CSV data by lines
                const lines = csvData.split('\n');
                // Extract domain names and filter based on relevance to search query
                const filteredData = lines.map(line => {
                    const parts = line.split(',');
                    const domain = parts[1].trim().toLowerCase(); // Convert to lowercase for case-insensitive matching
                    return domain;
                }).filter(domain => domain.includes(query.toLowerCase())); // Filter based on search query
                resolve(filteredData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Function to handle search functionality and display search results
function handleSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query').trim(); // Get search query from URL parameter

    // Call function to fetch data from CSV file and filter based on search query
    fetchDataFromCSV(query)
        .then(data => {
            // Display search results in the searchResults container
            const searchResultsContainer = document.getElementById('searchResults');
            // Clear previous results
            searchResultsContainer.innerHTML = '';
            // Append each domain name as a button to the container
            data.forEach(domain => {
                const button = document.createElement('button');
                button.textContent = domain + '.com';
                button.addEventListener('click', function() {
                    window.open('https://' + domain + '.com', '_blank');
                });
                searchResultsContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}

// Call function to handle search functionality when the page loads
window.addEventListener('load', handleSearch);
