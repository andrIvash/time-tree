/* API logic */

const express = require('express');
const router = express.Router();
const HttpError = require('../error/').HttpError;
const mime = require('mime-types');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const photoDir = './src/uploads'; // directory with files


const storage =   multer.diskStorage({ // multer settings
    destination: (req, file, callback) => {
        callback(null, photoDir);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname.replace(/\.[^.]+$/, "") + '-' + Date.now() + '.' + mime.extension(file.mimetype));
    }
});

const upload = multer({ storage : storage}).single('userPhoto'); // userPhoto form field name

/* Middleware to use for all requests */

router.use((err, req, res, next) => {
    // do logging
    res.json({ status: 200, message: 'hooray! welcome to our api!' });
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

/* API listing. */

router.route('/photos')
    .post((req, res, next) => {
        upload(req, res, (err) => {
            if (err) {
                return next(new HttpError(500, 'error loading file'));
            }
            res.json({status: 200,  message: 'File has uploaded' });
        });
    })
    .get((req, res, next) => {
        console.log(photoDir);
        fs.readdir(photoDir, (err, files) => {
            if(err) {
                return next(new HttpError(500, 'Directory not found'));
            }
            if (files.length > 0) {
                res.json(files);
            } else {
                res.json({status: 200,  message: 'No files found' });
            }
        });
    })
    .delete((req, res, next) => {
        fs.readdir(photoDir, (err, files) => {
            if (err) {
                return next(new HttpError(500, 'Directory not found'));
            }
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    let filePath = path.join(photoDir, files[i]);
                    if (fs.statSync(filePath).isFile()) {
                        fs.unlinkSync(filePath);
                    }
                }
                res.json({status: 200, message: 'Delete all'});
            } else {
                res.json({status: 200, message: 'Directory is clean'});
            }
        });
    });

module.exports = router;