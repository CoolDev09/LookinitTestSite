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
                    const id = parts[0];
                    const domain = parts[1].trim().toLowerCase(); // Convert to lowercase for case-insensitive matching
                    if (domain.includes(query)) {
                        // Create button and add .com to the domain name
                        const button = document.createElement('button');
                        button.textContent = domain + '.com';
                        button.addEventListener('click', function() {
                            window.open('https://' + domain + '.com', '_blank');
                        });
                        return button;
                    }
                }).filter(button => button); // Remove undefined values
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
    const query = urlParams.get('query').toLowerCase(); // Get search query from URL parameter

    // Call function to fetch data from CSV file and filter based on search query
    fetchDataFromCSV(query)
        .then(data => {
            // Display search results in the searchResults container
            const searchResultsContainer = document.getElementById('searchResults');
            // Append each button to the container
            data.forEach(button => {
                searchResultsContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}

// Call function to handle search functionality when the page loads
window.addEventListener('load', handleSearch);
