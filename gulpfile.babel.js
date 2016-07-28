import gulp from 'gulp';
import webpack from 'webpack-stream';
import plumber from 'gulp-plumber';
import plumberErrorHandler from 'gulp-plumber-error-handler';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import flatten from 'gulp-flatten';
import changed from 'gulp-changed';
import del from 'del';
import rename from 'gulp-rename';
/* postcss */
import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import cssImport from 'postcss-import';
import csso from 'gulp-csso';


const paths = {
    out: 'www/',
    src: 'src/',
    html: 'html/',
    img: 'img/',
    css: 'css/',
    js: 'js/'
};

function errorHandler(taskName) {
    return {
        errorHandler: plumberErrorHandler(`Error in ${taskName} task`),
    };
}

gulp.task('server', () => {
    gulp.watch(`${paths.src}${paths.html}**/*.html`, ['html']);
    gulp.watch(`${paths.src}${paths.css}**/*.css`, ['css']);
    gulp.watch(`${paths.src}${paths.js}**/*.js`, ['js']);
    gulp.watch(`${paths.src}${paths.img}**/*`, ['images']);
});

gulp.task('html', () => {
    return gulp
        .src(`${paths.src}${paths.html}**/*.html`)
        .pipe(plumber(errorHandler('html')))
        .pipe(gulp.dest(paths.out))
});

gulp.task('css', () => {
    return gulp
        .src(`${paths.src}${paths.css}**/*.css`)
        .pipe(plumber(errorHandler('css')))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.init())
        .pipe(postcss([
            cssImport(),
            cssnext()
        ]))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${paths.out}${paths.css}`))
});

gulp.task('js', () => {
    return gulp
        .src(`${paths.src}${paths.js}index.js`)
        .pipe(plumber(errorHandler('js')))
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(`${paths.out}${paths.js}`))
});

gulp.task('images', () => {
    return gulp
        .src(`${paths.src}${paths.img}**/*`)
        .pipe(plumber(errorHandler('images')))
        .pipe(changed(`${paths.out}${paths.img}`))
        .pipe(rename(flatten))
        .pipe(gulp.dest(`${paths.out}${paths.img}`));
});

gulp.task('clean', function () {
    del([paths.out]);
});

gulp.task('default', ['build', 'server']);
gulp.task('build', ['html', 'css', 'images', 'js']);
