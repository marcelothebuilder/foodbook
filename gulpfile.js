const gulp = require('gulp');
const gutil = require('gulp-util');
const bower = require('bower');
const sass = require('gulp-sass');
// const minifyCss = require('gulp-minify-css');
// const rename = require('gulp-rename');
const sh = require('shelljs');
const wiredep = require('gulp-wiredep');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const ngAnnotate = require('gulp-ng-annotate');

const paths = {
    sass: ['./scss/**/*.scss'],
    bower: ['./bower.json'],
    js: ['./src/**/*.js']
};

gulp.task('babel', () =>
    gulp.src(paths.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/js'))
);

gulp.task('default', ['watch']);

gulp.task('serve:before', ['babel', 'sass', 'wiredep', 'watch']);

gulp.task('sass', (done) => {
    gulp.src('./scss/app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', ['babel', 'sass', 'wiredep'], () => {
    gulp.watch(paths.js, ['babel']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.bower, ['wiredep']);
});

gulp.task('install', ['git-check'], () => {
    return bower.commands.install()
        .on('log', (data) => {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('wiredep', () => {
    return gulp.src('./www/index.html')
        .pipe(wiredep({
            exclude: ['./lib/ionic/css/ionic.css']
        }))
        .pipe(gulp.dest('./www/'));
});

gulp.task('git-check', (done) => {
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
