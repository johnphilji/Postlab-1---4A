const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing application/x-www-form-urlencoded
// This is required to access req.body properties from the form submission
app.use(express.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit', (req, res) => {
    // Extract form data from req.body
    const { studentName, branch, year } = req.body;
    
    // Print the submitted details to the terminal
    console.log('\n--- New Form Submission ---');
    console.log(`Student Name: ${studentName}`);
    console.log(`Branch: ${branch}`);
    console.log(`Year: ${year}`);
    console.log('---------------------------\n');
    
    // Display the submitted information with a beautiful UI
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form Submitted</title>
        <meta name="description" content="Submitted student information results.">
        <link rel="stylesheet" href="/style.css">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <div class="card result-card">
                <div class="deco-rect"></div>
                <div class="deco-rect right"></div>
                <h2>Submission Successful 🎉</h2>
                <div class="result-item">
                    <span class="label">Student Name:</span>
                    <span class="value">${studentName || 'Not Provided'}</span>
                </div>
                <div class="result-item">
                    <span class="label">Branch:</span>
                    <span class="value">${branch || 'Not Provided'}</span>
                </div>
                <div class="result-item">
                    <span class="label">Year:</span>
                    <span class="value">${year || 'Not Provided'}</span>
                </div>
                <a href="/" class="btn-back">Go Back</a>
            </div>
        </div>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
