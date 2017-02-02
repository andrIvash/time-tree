// Get dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const  HttpError = require('./error/').HttpError;

const app = express();

// Get our API routes
const api = require('./routes/api');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'app')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/index.html'));
});

/**
 * Catch error.
 */

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new HttpError(404, 'Sorry, Page Not Found');
    next(err);
});

// error handlers
app.use((err, req, res, next) => {
    if (typeof err == 'number') {
        err = new HttpError(err);
    }
    if (err instanceof HttpError) {
        res.send(err);
    } else {
        if (app.get('env') === 'development') {
            var errorhandler = errorHandler();
            errorhandler(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.send(err);
        }
    }
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));