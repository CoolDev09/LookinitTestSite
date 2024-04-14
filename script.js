document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton'); // Get the search button
    const searchResults = document.getElementById('searchResults');

    function search() {
        const query = searchInput.value.trim();

        if (query.length === 0) {
            searchResults.innerHTML = '';
            return;
        }

        const url = formatURL(query);
        openLink(url);
    }
    
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            search();
        }
    });

    searchButton.addEventListener('click', search); // Add click event listener to the search button

    // Function to open the link entered by the user
    function openLink(url) {
        var win = window.open();
        var iframe = win.document.createElement('iframe');
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.src = url;
        win.document.body.appendChild(iframe);
    }

    // Function to format the URL
    function formatURL(url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return 'https://' + url;
        }
        return url;
    }
});
