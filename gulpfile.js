var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var coffee = require('gulp-coffee');
var ghPages = require('gulp-gh-pages');
var plumber = require('gulp-plumber');
var serve = require('gulp-serve');
var runSequence = require('run-sequence');

// Configuration
var config = {
  srcFolder: __dirname + '/src',
  distFolder: __dirname + '/dist',
  supportedExtensions: [
    'coffee',
    'scss',
    'sass',
    'jade',
    'md'
  ],
  allTheFiles: []
}

// Setup
config.allTheFiles = [config.srcFolder + '/**/*'];
for (var i = 0; i < config.supportedExtensions.length; i++) {
  var extension = config.supportedExtensions[i];
  var path = '!' + config.srcFolder + '/**/*.' + extension;
  config.allTheFiles.push(path);
}

gulp.task('clean', function() {
  return gulp.src(config.distFolder, {read: false})
		.pipe(clean());
});

gulp.task('coffee', function() {
  gulp.src(config.srcFolder + '/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', console.log))
    .pipe(gulp.dest(config.distFolder));
});

gulp.task('sass', function() {
  return gulp.src([
      config.srcFolder + '/**/*.scss',
      config.srcFolder + '/**/*.sass'
    ])
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(config.distFolder));
});

gulp.task('jade', function() {
  return gulp.src(config.srcFolder + '/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.distFolder))
});

gulp.task('copy', function() {
  return gulp.src(config.allTheFiles)
    .pipe(gulp.dest(config.distFolder))
});

gulp.task('watch', function() {
  gulp.watch(config.srcFolder + '/*/**.scss', ['sass']);
  gulp.watch(config.srcFolder + '/*/**.sass', ['sass']);
  gulp.watch(config.srcFolder + '/*/**.coffee', ['coffee']);
  gulp.watch(config.srcFolder + '/*/**.jade', ['jade']);
  gulp.watch(config.allTheFiles, ['copy']);
});

gulp.task('serve', serve(config.distFolder));

gulp.task('default', ['build', 'run', 'watch']);

gulp.task('build', function() {
  runSequence('clean', ['coffee', 'sass', 'jade', 'copy']);
});

gulp.task('deploy', ['build'], function() {
  return gulp.src(config.distFolder + '/**/*')
    .pipe(ghPages());
});
