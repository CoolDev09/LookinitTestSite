// Function to fetch data from CSV file and filter based on relevance to search query
function fetchDataFromCSV(query) {
    return new Promise((resolve, reject) => {
        fetch('final_15million.csv') // Adjust the file name accordingly
            .then(response => response.text())
            .then(csvData => {
                // Split CSV data by lines
                const lines = csvData.split('\n');
                // Extract domain names and calculate relevance score based on search query
                const filteredData = lines.map(line => {
                    const parts = line.split(',');
                    const id = parts[0];
                    const domain = parts[1].trim().toLowerCase(); // Convert to lowercase for case-insensitive matching
                    const relevanceScore = calculateRelevanceScore(domain, query);
                    return { domain, relevanceScore };
                }).filter(item => item.relevanceScore > 0); // Remove items with zero relevance
                // Sort the filtered data based on relevance score (descending order)
                filteredData.sort((a, b) => b.relevanceScore - a.relevanceScore);
                // Extract domain names from sorted data
                const resultDomains = filteredData.map(item => item.domain);
                resolve(resultDomains);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Function to calculate relevance score of a domain to the search query
function calculateRelevanceScore(domain, query) {
    // Convert query and domain to lowercase for case-insensitive matching
    query = query.toLowerCase();
    domain = domain.toLowerCase();
    // Check if domain contains the entire query
    if (domain.includes(query)) {
        // If the domain exactly matches the query, return a high relevance score
        if (domain === query) {
            return 100;
        }
        // Otherwise, return a moderate relevance score
        return 50;
    }
    // If domain doesn't contain the entire query, return zero relevance score
    return 0;
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
