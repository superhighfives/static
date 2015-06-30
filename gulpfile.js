var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
    preprocess = require('gulp-preprocess'),
    shell = require('gulp-shell'),
    del = require('del'),
    ghpages = require('gulp-gh-pages')

// Static server with proxy
gulp.task('default', ['sass:watch', 'preprocess:watch'], function () {
  browserSync.init({
    port: 8888,
    files: ["src/*.html", "src/lib/**"],
    server: {
      baseDir: "./dist/"
    },
    open: false,
    notify: false,
    inject: true
  })
})
 
gulp.task('sass', ['clean'], function () {
  gulp.src('./src/assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(minify())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream())
})
 
gulp.task('sass:watch', ['sass'], function () {
  gulp.watch('.src/assets/sass/**/*.scss', ['sass'])
})

gulp.task('preprocess', function() {
  gulp.src('./src/*.html')
    .pipe(preprocess({context: { NODE_ENV: 'development'}}))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('preprocess:watch', ['preprocess'], function() {
  gulp.watch('./src/*.html', ['preprocess'])
})

gulp.task('copy', ['clean'], function() {
  var files = []
  gulp.src(files, { base: './src/' })
    .pipe(gulp.dest('./dist/'))
})

gulp.task('js', ['clean'], function() {
  return gulp.src('')
    .pipe(shell([
      'jspm bundle-sfx src/assets/js/main ./dist/assets/js/main.js --minify'
    ]))
})

gulp.task('build', ['sass', 'js', 'copy'], function() {
  gulp.src('./src/*.html')
    .pipe(preprocess({context: { NODE_ENV: 'production'}}))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('clean', function(cb) {
  del(['./dist/**/*'], cb)
})

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghpages({force: true}))
})