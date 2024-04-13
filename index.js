// Function to handle search functionality
function handleSearch() {
    const searchInput = document.getElementById('searchInput2');
    const searchButton = document.getElementById('searchButton2');

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim().toLowerCase();
        // Redirect to results page with search query in URL parameter
        window.location.href = 'results.html?query=' + query;
    });
}

// Call function to handle search functionality when the page loads
window.addEventListener('load', handleSearch);
