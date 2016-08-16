var gulp = require('gulp');
var concat = require('gulp-concat');

var APP_JS = 'app/app.js';

var VENDOR_CSS = [
  'node_modules/materialize-css/dist/css/materialize.min.css'
];

var VENDOR_JS = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/materialize-css/dist/js/materialize.min.js',
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

  gulp.src(VENDOR_CSS)
      .pipe(concat('vendor.css'))
      .pipe(gulp.dest('public/css'));

  gulp.src(VENDOR_JS)
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('public/js'));
});


gulp.task('default', ['build']);
