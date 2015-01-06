(function(){

  'use strict';

  var gulp = require('gulp'),
  gulp_sass = require('gulp-sass'),
  gulp_minifyCSS = require('gulp-minify-css'),
  gulp_rename = require('gulp-rename'),
  gulp_uglify = require('gulp-uglify'),
  gulp_connect = require('gulp-connect'),
  gulp_concat = require('gulp-concat');

  /**
  *  base_path source folder
  */
  var base_path = './';

  /**
  *  SASS files
  */

  var sass_base_path = base_path + '/scss/';
  var sass_source = sass_base_path + '/**/*.scss';

  /**
  *  JS files
  */

  var js_base_path = base_path + '/js/';
  var js_source = [
    js_base_path + '/main.js',
    js_base_path + '/maps.js',
    js_base_path + '/plugin.visualizeRisk.js',
    js_base_path + '/visualizations/singleRiskChart.js',
    js_base_path + '/visualizations/cumulativeRiskChart.js',
  ];

  gulp.task('webserver', function() {
    gulp_connect.server({
      livereload: true
    });
  });

  /**
  *  sass
  *    DEV: convert to css, copy to css
  *    PROD: convert to css, minify, copy to minified-css
  */
  gulp.task('sass', function () {

    return gulp.src( [
      sass_source,
      '!' + sass_base_path + '/**/component.*.scss',
      '!' + sass_base_path + '/**/mixins.*.scss'
      ], { base: sass_base_path })
      .pipe(gulp_sass())
      .pipe(gulp.dest( base_path + '/css' ))
      .pipe(gulp_rename({suffix: '.min'}))
      .pipe(gulp_minifyCSS())
      .pipe(gulp.dest( base_path + '/css' ));

  });

  gulp.task('angular', function () {

    gulp.src(['js/angular/**/app.js', 'js/angular/**/*.js'])
    .pipe(gulp_concat('angular.app.min.js'))
    .pipe(gulp_uglify())
    .pipe(gulp.dest(base_path + 'js/minified'));

  })

  gulp.task('scripts', function() {

    return gulp.src(
      js_source
      )
    .pipe(gulp_rename({suffix: '.min'}))
    .pipe(gulp_uglify())
    .pipe(gulp.dest(base_path + 'js/minified'));

  });

  gulp.task('watch', function(){

    var watch_files = [
    'gulpfile.js',
    sass_source,
    js_source,
    '*.html'
    ];
    gulp.watch( watch_files, ['sass', 'scripts', 'angular'] );

  });


  gulp.task('build', ['sass', 'scripts', 'angular', 'webserver', 'watch']);

})();
