var gulp = require('gulp');

/** Default **/
gulp.task('default', ['minify-css']);



/** Minify **/
var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', ['postcss'], function() {
    return gulp.src('./resources/css/style.css')
        .pipe(cleanCSS({ debug: true, output: 'style.min.css', format: { breaks: { afterBlockEnds: true, afterRuleEnds: true } } }, function(details) {
            // console.log(details.name + ', Original: ' + details.stats.originalSize);
            // console.log(details.name + ', Minified: ' + details.stats.minifiedSize);
            // console.log(details.name + ', Efficiency: ' + details.stats.efficiency);
        }))
    .pipe(gulp.dest('./resources/css/'));
});



/** Autoprefixer **/
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('postcss', ['sass'], function () {
    var plugins = [
        autoprefixer({ browsers: ['> 1%', 'last 2 versions'], grid: true })
    ];
    // console.log(autoprefixer({ browsers: ['> 1%', 'last 2 versions'], grid: true }).info());
    return gulp.src('./resources/css/style.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./resources/css/'));
});



/** SASS **/
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./resources/sass/style.scss')
    // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./resources/css'));
});



/** Watch task **/
gulp.task('sass:watch', function () {
  gulp.watch('./resources/sass/**/*.scss', ['minify-css']);
});
