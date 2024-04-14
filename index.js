// Function to handle search functionality when "Enter" key is pressed
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
}

// Function to handle search functionality and display search results
function handleSearch() {
    const searchInput = document.getElementById('searchInput2');
    const query = searchInput.value.trim(); // Get search query

    // Redirect to results page with search query in URL parameter
    window.location.href = 'results.html?query=' + encodeURIComponent(query);
}

// Attach event listener to the "keydown" event on the search input
document.getElementById('searchInput2').addEventListener('keydown', handleEnterKey);
