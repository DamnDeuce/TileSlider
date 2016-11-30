'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    historyFallback = require('connect-history-api-fallback');

var path = {
    dist: {
        js: 'dist/js/',
        style: 'dist/style/',
        sourcemaps: 'maps',
    },
    src: {
        js: {
            files: 'src/js/**/*.js',
            sourceRoot: '/src/js'
        },
        style: {
            files: 'src/style/**/*.scss',
            sourceRoot: '/src/style/'
        },
    },
    watch: {
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        html: '*.html',
    },
};


gulp.task('webserver', function () {
    browserSync({
        server: {
            baseDir: '.'
        },
        tunnel: true,
        host: 'localhost',
        port: 9001,
        logPrefix: 'TileSlider',
        middleware: [
            historyFallback()
        ]
    });
});

gulp.task('style:build', function() {
    return gulp.src(path.src.style.files)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false,
        }))
        .pipe(sourcemaps.write(path.dist.sourcemaps, { sourceRoot: path.src.style.sourceRoot }))
        .pipe(gulp.dest(path.dist.style))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('js:build', function() {
   return gulp.src(path.src.js.files)
       .pipe(gulp.dest(path.dist.js))
       .pipe(browserSync.stream());
});

gulp.task('build', [
    'style:build',
    'js:build'
]);

gulp.task('watch', ['style:build'], function() {
    watch(path.watch.js, function() {
        gulp.start('js:build');
    });
    watch(path.watch.html).on('change', browserSync.reload);
    watch(path.watch.style, function() {
        gulp.start('style:build');
    });
});

gulp.task('default', ['build', 'webserver', 'watch']);