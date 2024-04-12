// search.js

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput2');
    const searchButton = document.getElementById('searchButton2');

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length === 0) {
            return;
        }

        // Redirect to search results page with query parameter
        window.location.href = 'results.html?query=' + encodeURIComponent(query);
    }

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    searchButton.addEventListener('click', performSearch);
});
