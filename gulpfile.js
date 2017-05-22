// JavaScript Document
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
	flatten = require('gulp-flatten'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer')
    ;

//paths
//var resources = './AppBundle/Resources/';
var sassDir = 'sass/';

gulp.task('styles',function(){
  return gulp.src(sassDir+'main.scss')
      .pipe(sass(
        {
          outputStyle: 'nested'
        }
      ).on('error', sass.logError))
	  .pipe(autoprefixer("last 2 versions", "> 1%", "Explorer 7"))

      .pipe(gulp.dest('./web/css/'))
      .pipe(livereload())
      ;

});

gulp.task('html',function(){
    return gulp.src('*.html')
        .pipe(gulp.dest('./web/'))
})

gulp.task('icons',function(){
    return gulp.src('assets/fonts/**/*.{ttf,woff,eof,svg}')
		.pipe(flatten())
        .pipe(gulp.dest('web/fonts'))
})

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch([sassDir+'/*.scss', sassDir+'/*.sass'], ['styles']);
});


gulp.task('prod',function(){
    gulp.start('styles', 'html', 'icons');
});

gulp.task('minify', function () {
    gulp.src('./web/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./web/css/'))
});
