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
gulp.task('default', ['build', 'watch'], function () {
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

var generateSass = function () {
  return gulp.src('./src/assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(minify())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream())
}

gulp.task('sass', ['clean'], generateSass)
gulp.task('sass:watch', generateSass)


var generateHTML = function() {
  return gulp.src('./src/*.html')
    .pipe(preprocess({context: { NODE_ENV: 'development'}}))
    .pipe(gulp.dest('./dist/'))
}

gulp.task('preprocess', ['clean'], generateHTML)
gulp.task('preprocess:watch', generateHTML)

var copyFiles = function() {
  var files = ['testfile']
  return gulp.src(files, { cwd: './src/' })
    .pipe(gulp.dest('./dist/'))
}

gulp.task('copy', ['clean'], copyFiles)
gulp.task('copy:watch', copyFiles) 

gulp.task('watch', ['build'], function() {
  gulp.watch('./src/assets/sass/**/*.scss', ['sass:watch'])
  gulp.watch('./src/*.html', ['preprocess:watch'])
  gulp.watch(['./src/**/*', '!./src/*.html', '!./src/assets/sass/**/*', '!./src/assets/js/**/*'], ['copy:watch'])
})

gulp.task('js', ['clean'], function() {
  return gulp.src('')
    .pipe(shell([
      'jspm bundle-sfx src/assets/js/main ./dist/assets/js/main.js --minify'
    ]))
})

gulp.task('build', ['preprocess', 'sass', 'js', 'copy'])

gulp.task('clean', function(cb) {
  del(['./dist/**/*'], cb)
})

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghpages({force: true}))
})