// Function to fetch data from CSV file and add .com to all domains
function fetchDataFromCSV() {
    return new Promise((resolve, reject) => {
        fetch('final_15million.csv') // Adjust the file name accordingly
            .then(response => response.text())
            .then(csvData => {
                // Split CSV data by lines
                const lines = csvData.split('\n');
                // Extract domain names and add ".com" to all domains
                const filteredData = lines.map(line => {
                    const parts = line.split(',');
                    const id = parts[0];
                    const domain = parts[1].trim().toLowerCase(); // Convert to lowercase for case-insensitive matching
                    // Create button and add .com to the domain name
                    const button = document.createElement('button');
                    button.textContent = domain + '.com';
                    button.addEventListener('click', function() {
                        window.open('https://' + domain + '.com', '_blank');
                    });
                    return button;
                });
                resolve(filteredData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Call function to fetch data from CSV file and handle search results
fetchDataFromCSV()
    .then(data => {
        // Display search results in the searchResults container
        const searchResultsContainer = document.getElementById('searchResults');
        // Append each button to the container
        data.forEach(button => {
            searchResultsContainer.appendChild(button);
        });
    })
    .catch(error => {
        console.error('Error fetching search results:', error);
    });
