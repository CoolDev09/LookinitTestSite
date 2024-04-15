// Function to fetch Wikipedia search results
function fetchWikipediaResults(query) {
    // Construct the URL for the Wikipedia API
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`;

    // Fetch Wikipedia search results
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract search results from the response
            return data.query.search.map(result => {
                return {
                    title: result.title,
                    snippet: result.snippet
                };
            });
        })
        .catch(error => {
            console.error('Error fetching Wikipedia search results:', error);
            return []; // Return an empty array in case of error
        });
}

// Function to display Wikipedia search results
function displayWikipediaResults(results) {
    const wikipediaResultsContainer = document.getElementById('wikipediaResults');

    // Clear previous results
    wikipediaResultsContainer.innerHTML = '';

    // Display each Wikipedia search result
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `<h3>${result.title}</h3><p>${result.snippet}</p>`;
        wikipediaResultsContainer.appendChild(resultElement);
    });
}

// Function to handle search functionality and display search results
function handleSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query').trim(); // Get search query from URL parameter

    // Display search results from your CSV file
    displaySearchResultsFromCSV(query);

    // Fetch and display Wikipedia search results
    fetchWikipediaResults(query)
        .then(results => {
            displayWikipediaResults(results);
        });
}

// Call function to handle search functionality when the page loads
window.addEventListener('load', handleSearch);
