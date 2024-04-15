// Define a function to fetch Wikipedia search results
function fetchWikipediaResults(query) {
    // Construct the Wikipedia API URL
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${query}&origin=*`;

    // Make a GET request to the Wikipedia API
    return $.get(apiUrl);
}

// Define a function to display Wikipedia search results
function displayWikipediaResults(results) {
    // Clear the previous Wikipedia search results
    $('#wikipediaResults').empty();

    // Loop through the search results and append them to the #wikipediaResults div
    results.query.search.forEach(result => {
        const title = result.title;
        const snippet = result.snippet;
        const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

        const resultHtml = `<div class="wikipedia-result">
            <h3><a href="${url}" target="_blank">${title}</a></h3>
            <p>${snippet}</p>
        </div>`;

        $('#wikipediaResults').append(resultHtml);
    });
}

// Function to handle search and display results
function handleSearch(query) {
    // Fetch search results from your CSV file (function to display search results from results.js)
    displaySearchResultsFromCSV(query);

    // Fetch Wikipedia search results
    fetchWikipediaResults(query)
        .done(displayWikipediaResults) // Display Wikipedia search results on success
        .fail(function(error) {
            console.error('Error fetching Wikipedia search results:', error);
        });
}

// Call handleSearch function when the page loads
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    handleSearch(query);
});
