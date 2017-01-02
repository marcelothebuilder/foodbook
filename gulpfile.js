(function(gulp) {
    'use strict';
    var gutil = require('gulp-util');
    var bower = require('bower');
    var sass = require('gulp-sass');
    // var minifyCss = require('gulp-minify-css');
    // var rename = require('gulp-rename');
    var sh = require('shelljs');
    var wiredep = require('gulp-wiredep');
    var babel = require('gulp-babel');
    var plumber = require('gulp-plumber');
    var sourcemaps = require('gulp-sourcemaps');


    var paths = {
        sass: ['./scss/**/*.scss'],
        bower: ['./bower.json'],
        js: ['./src/**/*.js']
    };

    gulp.task('babel', function() {
        return gulp.src(paths.js)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('www/js'));
    });

    gulp.task('default', ['watch']);

    gulp.task('serve:before', ['sass', 'wiredep', 'watch']);

    gulp.task('sass', function(done) {
        gulp.src('./scss/app.scss')
            .pipe(sass())
            .on('error', sass.logError)
            .pipe(gulp.dest('./www/css/'))
            .on('end', done);
    });

    gulp.task('watch', ['sass', 'wiredep'], function() {
        gulp.watch(paths.js, ['babel']);
        gulp.watch(paths.sass, ['sass']);
        gulp.watch(paths.bower, ['wiredep']);
    });

    gulp.task('install', ['git-check'], function() {
        return bower.commands.install()
            .on('log', function(data) {
                gutil.log('bower', gutil.colors.cyan(data.id), data.message);
            });
    });

    gulp.task('wiredep', function() {
        return gulp.src('./www/index.html')
            .pipe(wiredep({
                exclude: ['./lib/ionic/css/ionic.css']
            }))
            .pipe(gulp.dest('./www/'));
    });

    gulp.task('git-check', function(done) {
        if (!sh.which('git')) {
            console.log(
                '  ' + gutil.colors.red('Git is not installed.'),
                '\n  Git, the version control system, is required to download Ionic.',
                '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
            );
            process.exit(1);
        }
        done();
    });
})(require('gulp'));
