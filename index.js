// Function to handle search
function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        window.location.href = 'results.html?query=' + encodeURIComponent(query);
    }
}

// Add event listener to search button
document.getElementById('searchButton').addEventListener('click', handleSearch);
