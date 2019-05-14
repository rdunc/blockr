'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const del = require('del');

gulp.task('sass', function () {
  return gulp.src('app/assets/sass/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('app/assets/dist/css'));
});

gulp.task('js', function () {
  return gulp.src([
    'app/assets/js/vendor/bootstrap.js',
    'app/assets/js/vendor/angular.js',
    'app/assets/js/vendor/angular-route.js',
    'app/assets/js/vendor/angular-route.js',
    'app/assets/js/vendor/clipboardjs.js',
    'app/assets/js/vendor/dirPagination.js',
    'app/assets/js/vendor/perfect-scrollbar.js',
    'app/assets/js/app.js',
    'app/assets/js/routes.js',
    'app/assets/js/directives/*',
    'app/assets/js/controllers/**/*',
    'app/assets/js/services/**/*',
  ])
  .pipe(concat('app.js'))
  .pipe(ngAnnotate({add: true}))
  .pipe(gulp.dest('app/assets/dist/js'));
});

gulp.task('clean', function() {
  return del(['app/assets/dist/css', 'app/assets/dist/js']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('sass', 'js');
});
