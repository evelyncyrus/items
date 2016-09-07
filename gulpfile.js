//@auther: evelyncyrus
//@createdtime: 2016/9/7
//@github: http://github.com/evelyncyrus

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    webserver = require('gulp-webserver'),    
    browserSync = require('browser-sync').create(), // 同步
    sprite = require('gulp.spritesmith'),  // 生成雪碧图
    del = require('del');

var root = 'static/';
var goal = '../m.ppdaicdn.com/msite';
var jsPath = root + 'js/*.js';
var cssPath = root + 'css/**/*.scss';
var imgPath = root + 'img/*';
var htmlPath = 'pages/*.html';

//html
gulp.task('html', function() {
    return gulp.src(htmlPath)
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'html task complete' }));
}); 

// css
gulp.task('css', function() {
  return sass(cssPath, { style: 'expanded' })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))  // css3属性兼容的浏览器配置
    .pipe(gulp.dest( 'dist/css')) //放入目标文件夹
    .pipe(minifycss())  //混淆
    .pipe(rename({ suffix: '.min' }))  //加后缀
    .pipe(gulp.dest( goal + '/css')) //混淆后加入目标文件
    .pipe(notify({ message: 'css task complete' }));
});

// js
gulp.task('js', function() {
  return gulp.src(jsPath)
    //.pipe(concat('main.js'))  //jsPath下所有js文件合并到main.js
    .pipe(gulp.dest( 'dist/js'))  //合并后放入目标文件夹
    .pipe(rename({ suffix: '.min' })) //重命名
    .pipe(uglify())                    //混淆文件
    .pipe(gulp.dest( goal + '/js'))       //混淆后文件放入目标文件夹
    .pipe(notify({ message: 'js task complete' }));  //输出完成消息
});

// Images
gulp.task('images', function() {
  return gulp.src(imgPath)
    .pipe(gulp.dest( 'dist/img'))   
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest( 'dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// 雪碧图
gulp.task('sprite',function(){
  return gulp.src(root+'img/sprite/*.png')
    .pipe(sprite({
      imgName:'sprite.png',
      cssName:'sprite.scss',
      cssFormat: 'scss'
    })).pipe(gulp.dest('dist/img/sprite'));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/'], cb)
});

// Watch
gulp.task('watch', function() {

  //Watch .html files
  gulp.watch(htmlPath, ['html']);

  // Watch .scss files
  gulp.watch(cssPath, ['css']);

  // Watch .js files
  gulp.watch(jsPath, ['js']);

  // Watch image files
  gulp.watch(imgPath, ['images']);


});

//Server
var config = {
    baseDir: './',         //gulpfile.js所在的根目录
    watchFiles: ['**/*.*'] //监听项目文件下所有文件
}

gulp.task('server', ['html','images','js', "css"], function() {
  // browserSync初始化配置
  browserSync.init({
      files: config.watchFiles,
      server: {
          baseDir: config.baseDir,
      },
  });
  gulp.watch(jsPath, ["js"]);
  gulp.watch(cssPath, ["css"]);
  gulp.watch(htmlPath).on("change", browserSync.reload);
  gulp.start('watch');
});

// Default task
gulp.task('default', ['server']);