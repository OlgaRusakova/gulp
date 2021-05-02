"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const csso = require('gulp-csso');
const autoprefixer  = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

gulp.task("sass", function () {
  return gulp
    .src("./src/assets/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
    .pipe(autoprefixer({
      cascade: false
  }))
    .pipe(gcmq())
    .pipe(csso())
    .pipe(rename({suffix:'.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("./src/assets/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "src",
    },
    // notify: false,
    // tunnel: true,
  });
});

gulp.task("checkupdate", function () {
  gulp.watch("./src/assets/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("./src/*.html").on('change', browserSync.reload);
});



gulp.task("watch", gulp.parallel("sass", "checkupdate", "browser-sync",));
