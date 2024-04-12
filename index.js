// Function to handle search
function handleSearch() {
    const query = document.getElementById('searchInput2').value.trim();
    if (query) {
        window.location.href = 'results.html?query=' + encodeURIComponent(query);
    }
}

// Add event listener to search button
document.getElementById('searchButton2').addEventListener('click', handleSearch);
