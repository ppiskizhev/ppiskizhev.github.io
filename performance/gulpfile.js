const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const minify = require("gulp-csso");
// const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");
const run = require("run-sequence");
const rename = require("gulp-rename");
const pump = require("pump");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;

gulp.task("html", function() {
  return gulp
    .src("*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
  gulp
    .src("css/styles.css")
    .pipe(gulp.dest("build/css")) /* кидает исходник в css/ */
    .pipe(minify()) /* минифицирует style.css */
    .pipe(rename("styles.min.css")) /* переименование */
    .pipe(gulp.dest("build/css")); /* еще раз кидает в css/ */
});

gulp.task("scripts", function() {
  return gulp
    .src("js/scripts.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("images", function() {
  return gulp
    .src("build/assets/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({
          optimizationLevel: 3
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.svgo()
      ])
    )
    .pipe(gulp.dest("build/assets"));
});

gulp.task("copy", function() {
  return gulp
    .src(["fonts/*.woff", "assets/**", "favicon.ico", "manifest.json"], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("webp", function() {
  return gulp
    .src("assets/*.{png,jpg}")
    .pipe(webp({ quality: 90 })) /* Конвертируем png/jpg в webp */
    .pipe(gulp.dest("build/assets"));
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    "images",
    "html",
    "webp",
    "scripts",
    done /* Самым последним вызовом функции run должна быть функция, которая была передана как аргумент */
  );
});
