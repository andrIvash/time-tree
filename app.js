'use strict';

const http = require ('http'),
      express = require('express'),
      app = require('express')(),
      path = require('path'),
      hostname = 'localhost',
      port = 3000;


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/assets/templates/index.html'));
});

app.use('/assets/css', express.static('./app/assets/css/'));
app.use('/assets/js', express.static('./app/assets/js/'));

http.createServer(app).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

