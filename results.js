// Function to fetch and display search results
function displaySearchResults() {
    // Get search query from URL parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('query');
    
    // Example: Display search query in console
    console.log('Search query:', query);
    
    // You can use the search query to fetch data and display results here
    // Example: Fetch data based on query and display results
}

// Call function to display search results when the page loads
window.addEventListener('load', displaySearchResults);
