// Function to display Wikipedia search results in paragraph format
function displayWikipediaResults(results) {
    // Clear previous results
    $('#wikipediaResults').empty();

    // Loop through the search results and display them as paragraphs
    results.query.search.forEach(result => {
        const title = result.title;
        const snippet = result.snippet;
        const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

        const resultHtml = `<p><strong><a href="${url}" target="_blank">${title}</a></strong>: ${snippet}</p>`;
        $('#wikipediaResults').append(resultHtml);
    });
}
