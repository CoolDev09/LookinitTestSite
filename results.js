// Function to fetch data from CSV file
function fetchDataFromCSV(query) {
    return new Promise((resolve, reject) => {
        fetch('random.csv')
            .then(response => response.text())
            .then(csvData => {
                // Split CSV data by lines
                const lines = csvData.split('\n');
                // Filter lines based on the search query
                const filteredData = lines.filter(line => line.trim().toLowerCase().includes(query.toLowerCase()));
                resolve(filteredData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Function to fetch data from JSON file
function fetchDataFromJSON(query) {
    return new Promise((resolve, reject) => {
        fetch('ranked_domains.json')
            .then(response => response.json())
            .then(data => {
                // Filter JSON data based on the search query
                const filteredData = data.filter(item => item.domain.toLowerCase().includes(query.toLowerCase()));
                resolve(filteredData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Function to fetch and display search results
function displaySearchResults() {
    // Get search query from URL parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('query');
    
    // Example: Display search query in console
    console.log('Search query:', query);
    
    // Check if a search query exists
    if (query) {
        Promise.all([
            fetchDataFromCSV(query),
            fetchDataFromJSON(query)
        ]).then(([csvResults, jsonResults]) => {
            // Combine and display search results from both sources
            const combinedResults = [...csvResults, ...jsonResults];
            const searchResultsContainer = document.getElementById('searchResults');
            searchResultsContainer.innerHTML = ''; // Clear previous results
            
            // Example: Display each search result as a button
            combinedResults.forEach(result => {
                const button = document.createElement('button');
                button.textContent = result;
                button.addEventListener('click', function() {
                    // Handle button click event (e.g., open result URL)
                    window.open('https://' + result, '_blank'); // Open link in new tab
                });
                searchResultsContainer.appendChild(button);
            });
        }).catch(error => {
            console.error('Error fetching search results:', error);
        });
    } else {
        // Display message if no search query is provided
        console.log('No search query provided.');
    }
}

// Call function to display search results when the page loads
window.addEventListener('load', displaySearchResults);
