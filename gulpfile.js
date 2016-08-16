var gulp = require('gulp');
var concat = require('gulp-concat');

var APP_JS = 'app/**/*.js';
var APP_CSS = 'app/**/*.css';

var VENDOR_CSS = [];

var VENDOR_JS = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/handlebars/dist/handlebars.js',
  'node_modules/underscore/underscore.js',
  'node_modules/backbone/backbone.js',
  'node_modules/moment/min/moment.min.js',
  'node_modules/firebase/firebase-app.js',
  'node_modules/firebase/firebase-database.js'
];

gulp.task('watch', ['build'], function () {
    gulp.watch('app/**/*', ['build']);
});

gulp.task('build', function() {
  gulp.src('app/index.html')
      .pipe(gulp.dest('public/'));

  gulp.src(APP_JS)
      .pipe(concat('app.js'))
      .pipe(gulp.dest('public/js'));

  gulp.src(APP_CSS)
      .pipe(concat('app.css'))
      .pipe(gulp.dest('public/css'));

  gulp.src(VENDOR_CSS)
      .pipe(concat('vendor.css'))
      .pipe(gulp.dest('public/css'));

  gulp.src(VENDOR_JS)
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('public/js'));
});


gulp.task('default', ['build']);
