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
        // Fetch data based on the search query (replace this with your own data fetching logic)
        fetch('your_data_source_url?q=' + encodeURIComponent(query))
            .then(response => response.json())
            .then(data => {
                // Example: Display search results in the searchResults container
                const searchResultsContainer = document.getElementById('searchResults');
                searchResultsContainer.innerHTML = ''; // Clear previous results
                
                // Example: Display each search result as a button
                data.forEach(result => {
                    const button = document.createElement('button');
                    button.textContent = result.title; // Replace 'title' with the property name containing the result text
                    button.addEventListener('click', function() {
                        // Handle button click event (e.g., open result URL)
                        window.open(result.url, '_blank'); // Open link in new tab
                    });
                    searchResultsContainer.appendChild(button);
                });
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    } else {
        // Display message if no search query is provided
        console.log('No search query provided.');
    }
}

// Call function to display search results when the page loads
window.addEventListener('load', displaySearchResults);
