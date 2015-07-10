var gulp = require('gulp'),
    shell = require('gulp-shell');
    minifyHTML = require('gulp-minify-html');
		minifyCss = require('gulp-minify-css');
	  autoprefixer = require('gulp-autoprefixer');

gulp.task('jekyll', function() {
  return gulp.src('index.html', { read: false })
    .pipe(shell([
      'jekyll build'
  ]));
});

gulp.task('html', ['jekyll'], function() {
    return gulp.src('_site/**/*.html')
        .pipe(minifyHTML({
            quotes: true
        }))
        .pipe(gulp.dest('_site/'));
});

gulp.task('build-css', function() {
    return gulp.src('./_site/css/*.css')
        .pipe(minifyCss())
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false,
        }))
        .pipe(gulp.dest('./_site/css'));
});

gulp.task('build', [ 'jekyll' ], function() {
    gulp.run('build-css');
    gulp.run('html');
});

gulp.task('default', [ 'build' ], function() {});


