// Function to fetch data from CSV file and filter specific domains
function fetchDataFromCSV(query) {
    return new Promise((resolve, reject) => {
        fetch('final_15million.csv')
            .then(response => response.text())
            .then(csvData => {
                // Split CSV data by lines
                const lines = csvData.split('\n');
                // Extract domain names, add ".com", and filter specific domains
                const filteredData = lines.map(line => {
                    const parts = line.split(',');
                    const id = parts[0];
                    const domain = parts[1].toLowerCase(); // Convert to lowercase for case-insensitive matching
                    const label = parts[2];
                    if (['google', 'facebook', 'twitter', 'youtube'].includes(domain)) {
                        return domain + '.com'; // Add ".com" to the domain
                    }
                }).filter(domain => domain); // Remove undefined values
                resolve(filteredData);
            })
            .catch(error => {
                reject(error);
            });
    });
}
