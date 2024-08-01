<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON File Handling</title>
</head>
<body>
    <h1>JSON File Handling</h1>
    <div id="data"></div>
    <button onclick="readJSON()">Read JSON</button>
    <button onclick="writeJSON()">Write JSON</button>
    <button onclick="editJSON()">Edit JSON</button>
    <button onclick="deleteJSON()">Delete JSON</button>
    <script>
        const jsonFilePath = '/path/to/your.json';

        function readJSON() {
            fetch(jsonFilePath)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('data').textContent = JSON.stringify(data, null, 2);
                })
                .catch(error => console.error('Error:', error));
        }

        function writeJSON() {
            const data = { "key": "value" };
            fetch(jsonFilePath, {
                method: 'POST', // Netlify Functions ကနေ အသုံးပြုနိုင်ပါသည်
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => console.error('Error:', error));
        }

        function editJSON() {
            const data = { "key": "new value" };
            fetch(jsonFilePath, {
                method: 'PUT', // Netlify Functions ကနေ အသုံးပြုနိုင်ပါသည်
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => console.error('Error:', error));
        }

        function deleteJSON() {
            fetch(jsonFilePath, {
                method: 'DELETE' // Netlify Functions ကနေ အသုံးပြုနိုင်ပါသည်
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => console.error('Error:', error));
        }
    </script>
</body>
</html>