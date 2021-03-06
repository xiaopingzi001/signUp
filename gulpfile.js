'use strict';
/**
 * 引入包
 */
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');//sass的编译
var cleanCss = require('gulp-clean-css');//压缩css
var autoprefixer = require('gulp-autoprefixer');//自动添加css前缀
var concat = require('gulp-concat');//合并js文件
var rename = require('gulp-rename');//重命名
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


/*
 * default
 * */
gulp.task('default', ['styles', 'cleanCss'],function(){


});

// 实时刷新浏览器
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: ["./html/"]
        }
    });

});


/*
 * 监听
 * */
gulp.task("watch",['server'], function(){
    gulp.watch('./html/static/src/*.scss', ['styles']);
    gulp.watch('./html/static/css/*.css', ['cleanCss']);

    gulp.watch('./html/static/css/*.css', ['cleanCss']).on('change', reload);
    gulp.watch("./html/*.html").on('change', reload);

});

// Styles任务
gulp.task('styles', function() {
    //编译sass
    return sass('./html/static/src/*.scss')

    //保存未压缩文件到我们指定的目录下面
        .pipe(gulp.dest('./html/static/css/'))

        //添加前缀
        .pipe(autoprefixer('last 2 version'))

        .pipe(gulp.dest('./html/static/css/'))

    //提醒任务完成
    //.pipe(notify({ message: 'Styles task complete' }));
});


// cleanCss
gulp.task('cleanCss', function() {
    //编译sass
    return gulp.src('./html/static/css/*.css')
        //css代码合并
        .pipe(concat('all.css'))

        //给文件添加.min后缀
        .pipe(rename({ suffix: '.min' }))

        //压缩样式文件
        .pipe(cleanCss({compatibility: 'ie7'}))

        //输出压缩文件到指定目录
        .pipe(gulp.dest('./html/static/minCss/'))

    //提醒任务完成
    //.pipe(notify({ message: 'cleanCss task complete' }));
});
