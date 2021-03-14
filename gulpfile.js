"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');

const dist = "./dist/";
// const dist = "/Applications/MAMP/htdocs/test"; // Ссылка на вашу папку на сервере
gulp.task("styles", () => {
   return gulp.src("./src/**/*.css")
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
         overrideBrowserslist: ['> 1%', 'ie 10'],
         grid: true
      }))
      .pipe(cleancss(({
         level: {
            1: {
               specialComments: 0
            }
         },
         // format: 'beautify'
      })))
      .pipe(gulp.dest('dist/css/'))
      .pipe(browsersync.stream());
});

gulp.task("copy-html", () => {
   return gulp.src(["./src/*.html", "./src/**/*.css"])
      .pipe(gulp.dest(dist))
      .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
   return gulp.src("./src/index.js")
      .pipe(webpack({
         mode: 'development',
         output: {
            filename: 'script.js'
         },
         watch: false,
         devtool: "source-map",
         module: {
            rules: [{
               test: /\.m?js$/,
               exclude: /(node_modules|bower_components)/,
               use: {
                  loader: 'babel-loader',
                  options: {
                     presets: [
                        ['@babel/preset-env', {
                           debug: true,
                           corejs: 3,
                           useBuiltIns: "usage"
                        }]
                     ]
                  }
               }
            }]
         }
      }))
      .pipe(gulp.dest(dist))
      .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
   return gulp.src("./src/**/*.*")
      .pipe(gulp.dest(dist))
      .on("end", browsersync.reload);
});

gulp.task("watch", () => {
   browsersync.init({
      server: {
         baseDir: "./dist/",
         serveStaticOptions: {
            extensions: ["html"]
         }
      },
      port: 4000,
      notify: true
   });

   gulp.watch(["./src/*.html", "./src/**/*.css"], gulp.parallel("copy-html"));
   gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
   gulp.watch("./src/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js", "styles"));

gulp.task("build-prod-js", () => {
   return gulp.src("./src/index.js")
      .pipe(webpack({
         mode: 'production',
         output: {
            filename: 'script.js'
         },
         module: {
            rules: [{
               test: /\.m?js$/,
               exclude: /(node_modules|bower_components)/,
               use: {
                  loader: 'babel-loader',
                  options: {
                     presets: [
                        ['@babel/preset-env', {
                           corejs: 3,
                           useBuiltIns: "usage"
                        }]
                     ]
                  }
               }
            }]
         }
      }))
      .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));