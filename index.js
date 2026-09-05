const express = require('express');
const path = require('path');
const app = express();

// Tell the server to show the files in your project folder
app.use(express.static(__dirname));

// Send your main index.html file when someone visits your website
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Tell Railway which port number to use
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
