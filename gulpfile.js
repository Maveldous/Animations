let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    ulify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');



gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass( {outputStyle : 'compressed'}))
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('dest/css'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('script', function(){
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('dest/js'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dest/'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('js', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
        'node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(ulify())
        .pipe(gulp.dest('dest/js'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dest/"
        }
    });
});


gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
})

gulp.task('default', gulp.parallel('scss', 'html', 'script' , 'js' ,'browser-sync', 'watch'))