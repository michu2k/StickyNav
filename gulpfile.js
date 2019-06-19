const gulp         = require('gulp');
const sass         = require('gulp-sass');
const babel        = require('gulp-babel');
const cleanCSS     = require('gulp-clean-css');
const uglify       = require('gulp-uglify');
const browserSync  = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const rename       = require('gulp-rename');

// Config
const config = {
    srcCSS: 'demo/scss/**/*.scss',
    distCSS: 'demo/css',
    srcJS: 'src/**/*.js',
    distJS: 'dist'
};

// Server
function server() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
}

// Server reload
function reload(done) {
    browserSync.reload();
    done();
}

// Javascript
function compileJs() {
    return gulp.src(config.srcJS)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.distJS));
}

// Sass
function compileSass() {
    return gulp.src(config.srcCSS)
        .pipe(sass({outputStyle: 'expanded'})
        .on('error', sass.logError))
        .pipe(autoprefixer({cascade: false}))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.distCSS));
}

// Watch Sass files
function watchSass() {
    gulp.watch(config.srcCSS, gulp.series(compileSass, reload));   
}

// Watch Javascript files
function watchJs() {
    gulp.watch(config.srcJS, gulp.series(compileJs, reload));   
}

// Watch HTML files
function watchHtml() {
    gulp.watch('demo/*.html', gulp.series(reload));
}

// Main task
gulp.task('default', gulp.parallel(server, watchSass, watchJs, watchHtml));