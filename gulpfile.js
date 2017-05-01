// JavaScript Document
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass')
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
      .pipe(gulp.dest('./web/css/'))
      .pipe(livereload())
      ;

});

gulp.task('html',function(){
    return gulp.src('*.html')
        .pipe(gulp.dest('./web/'))
})

gulp.task('icons',function(){
    return gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/**.*')
        .pipe(gulp.dest('web/fonts'))
})

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch([sassDir+'/*.scss', sassDir+'/*.sass'], ['styles']);
});

gulp.task('prod',function(){
    gulp.start('styles', 'html', 'icons');
});
