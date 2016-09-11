//---------------------------------------- init ---------------------------------------//
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var rimraf = require('rimraf');



//---------------------------------------- webpack ---------------------------------------//
gulp.task('webpack', function(callback) {
    // run webpack
    webpack(
        // configuration
        require('./webpack.config.js')
        , function(err, stats) {
            if(err) throw new gutil.PluginError('webpack', err);
            gutil.log('[webpack]', stats.toString({
                // output options
            }));
            callback();
        });
});
//---------------------------------------- sass ---------------------------------------//
gulp.task('sass', function() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', notify.onError({ title: 'Style' }))
        .pipe(autoprefixer({ browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'] }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(browserSync.stream());
});
//---------------------------------------- pug ------------------------------------------//
gulp.task('views', function buildHTML() {
    return gulp.src('./src/templates/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./app/assets/templates'))
});

//---------------------------------------- watch ---------------------------------------//
gulp.task('watch', function() {
    gulp.watch('./src/scripts/**/*.js', gulp.series('webpack'));
    gulp.watch('./src/styles/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/templates/**/*.pug', gulp.series('views'));
});

//---------------------------------------- server ---------------------------------------//
gulp.task('serve', function() {

    browserSync.init({
        //server: './app'
        proxy: "localhost:3000",
        open: false
    });

    gulp.watch('src/styles/*.scss', browserSync.reload);
    gulp.watch('./src/templates/**/*.pug', browserSync.reload);
    gulp.watch('./src/scripts/**/*.js', browserSync.reload);
});


//---------------------------------------- clean ---------------------------------------//
gulp.task('clean', function(cb) {
    return rimraf('./app/assets', cb);
});


//---------------------------------------- default ---------------------------------------//
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel(
        'views',
        'sass',
        'webpack'
    ),
    gulp.parallel(
        'watch',
        'serve'
    )
));
