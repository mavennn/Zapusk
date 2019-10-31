'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require("browser-sync"),
    babel = require('gulp-babel'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'public/build/',
        js: 'public/build/js/',
        css: 'public/build/css/',
        img: 'public/build/img/',
        fonts: 'public/build/fonts/'
    },
    src: {
        html: 'public/src/*.html',
        js: 'public/src/js/*.js',
        style: 'public/src/style/*.scss',
        img: 'public/src/img/**/*.*',
        fonts: 'public/src/fonts/**/*.*'
    },
    watch: {
        html: 'public/src/**/*.html',
        js: 'public/src/js/**/*.js',
        style: 'public/src/style/**/*.scss',
        img: 'public/src/img/**/*.*',
        fonts: 'public/src/fonts/**/*.*'
    },
    clean: 'public/build'
};

var config = {
	open: false,
    tunnel: false,
    proxy: 'localhost:3021',
    logPrefix: "Frontend_Devil"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

/*
gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});
*/

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        //.pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', gulp.parallel(
    'html:build',
    'style:build',
    'fonts:build',
    'image:build',
));


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));