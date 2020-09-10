const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    minifyjs = require('gulp-minify'),
    deploy = require('gulp-gh-pages');

gulp.task('sass', function() {
    return gulp.src('src/styles/*.sass')
        .pipe(sass({outputStyle: ''}))
        .pipe(gulp.dest('src/styles'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function () {
    return gulp.src('src/scripts/*.js')
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('build', async function() {
    let buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
    let buildCss = await gulp.src('src/styles/App.sass')
        .pipe(sass({outputStyle: ''}))
        .pipe(cssmin())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/styles'));
    let buildJs = gulp.src('src/scripts/*.js')
        .pipe(minifyjs())
        .pipe(gulp.dest('build/scripts'))
});

gulp.task('deploy', function() {
    return gulp.src("build/**/*")
    .pipe(deploy())
})


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('src/styles/*.sass', gulp.parallel('sass'))
    gulp.watch('src/*.html', gulp.parallel('html'))
    gulp.watch('src/scripts/*.js', gulp.parallel('script'))
})

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
