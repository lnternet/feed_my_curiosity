const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');

app = express();

// Bind route page to index.html in /dist folder:
app.use("/", serveStatic(path.join(__dirname, 'dist')));

// Catch all routes and redirect to the index file:
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

const port = process.env.PORT || 80;
app.listen(port);

console.log('Server started on port', port);