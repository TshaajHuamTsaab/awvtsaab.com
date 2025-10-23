const express = require('express');
const path = require('path');
const app = express();

// Serve static pages from /static
app.use('/static', express.static(path.join(__dirname, 'static')));

// Serve root index.html (login page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => console.log('Server running'));

