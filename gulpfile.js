"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var uglifycss = require("gulp-uglifycss");
var uglify = require("gulp-uglify");
var pump = require("pump");
var concat = require("gulp-concat");
var streamqueue = require("streamqueue");

// browserSync.create();

//sass to css

gulp.task("sass", function() {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/css"));
});

gulp.task("sass:watch", function() {
  gulp.watch("./src/sass/*.scss", ["sass"]);
});

//minimize css

gulp.task("css", function() {
  gulp
    .src("./src/css/*.css")
    .pipe(
      uglifycss({
        maxLineLen: 80,
        uglyComments: true
      })
    )
    .pipe(gulp.dest("./dist/"));
});

//minimize js

gulp.task("compress", function(cb) {
  pump([gulp.src("./src/js/*.js"), uglify(), gulp.dest("dist")], cb);
});

// gulp.task("scripts", function() {
//   return gulp
//     .src("./lib/*.js")
//     .pipe(concat("all.js"))
//     .pipe(gulp.dest("./dist/"));
// });

// var queue = streamqueue(
//   Fs.createReadStream("input.txt"),
//   Fs.createReadStream("input2.txt"),
//   Fs.createReadStream("input3.txt")
// ).pipe(process.stdout);

//vendors js

gulp.task("vendors-js", function() {
  return streamqueue(
    { objectMode: true },
    gulp.src(`./src/js/vendors/bootstrap/bootstrap.min.js`),
    gulp.src(`./src/js/vendors/jquery/jquery-3.1.1.min.js`),
    gulp.src(`./src/js/vendors/greensock/TweenMax.min.js`),
    gulp.src(`./src/js/vendors/scrollmagic/ScrollMagic.min.js`),
    gulp.src(`./src/js/vendors/greensock/ScrollToPlugin.min.js`),
    gulp.src(`./src/js/vendors/scrollmagic/animation.gsap.min.js`),
    gulp.src(`./src/js/vendors/scrollmagic/debug.addIndicators.min.js`)
  )
    .pipe(concat("vendors.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(`./dist/`));
});

gulp.task("run", [("sass", "css", "compress", "vendors-js")]);

gulp.task("watch", function() {
  gulp.watch("./src/sass/*.scss", ["sass"]);
  gulp.watch("./src/css/*.css", ["css"]);
  gulp.watch("./src/js/*.js", ["compress"]);
  gulp.watch("./src/js/vendors/*.js", ["vendors-js"]);
});

gulp.task("default", ["run", "watch"]);
