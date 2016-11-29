'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    historyFallback = require('connect-history-api-fallback'),
    reload = browserSync.reload;

var path = {
    dist: {

    },
    src: {
        js: 'src/js/**/*.js',
        styles: 'src/style/**/*.css',
    },
    watch: {
        js: 'src/js//**/*.js',
        styles: 'src/style/**/*.css',
    },
};

var browserSyncConfig = {
    server: {
        baseDir: '.'
    },
    // tunnel: true,
    host: 'localhost',
    port: 9001,
    logPrefix: 'dev.promo.marco.justtaxi.ru',
    middleware: [
        historyFallback()
    ]
};

gulp.task('webserver', function () {
    browserSync(browserSyncConfig);
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
            .pipe(reload({stream: true}));
});
gulp.task('styles:build', function () {
    return gulp.src(path.src.styles)
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'js:build',
    'styles:build'
]);

gulp.task('watch', function() {
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.styles], function(event, cb) {
        gulp.start('styles:build');
    });
});

gulp.task('default', ['webserver', 'watch']);