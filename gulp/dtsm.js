'use strict';

var gulp = require('gulp');
var dtsm = require('gulp-dtsm');

gulp.task('dtsm:install', function() {
  return gulp.src('./dtsm.json')
    .pipe(dtsm());
});

gulp.task('dtsm:purge', function() {
  return true;
});

gulp.task('dtsm', ['dtsm:install']);
