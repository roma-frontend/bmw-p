const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other requests by returning the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});