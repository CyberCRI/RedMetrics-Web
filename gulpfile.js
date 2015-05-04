var gulp = require('gulp'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    runSequence = require('run-sequence'),
    rimraf = require('rimraf'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    copy = require('gulp-copy'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    annotate = require('gulp-ng-annotate'),
    sass = require('gulp-sass'),
    path = require('path'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    rev = require('gulp-rev'),
    templateCache = require('gulp-angular-templatecache'),
    rsync = require('rsyncwrapper').rsync,
    run = require('gulp-run'),
    merge = require("merge-stream");


// PORT NUMBERS
var livereloadport = 35729,
    serverport = 5005;


// DEV SERVER
var devServer = express();
devServer.use(livereload({port: livereloadport}));
devServer.use(express.static('./dev'));
devServer.all('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dev' });
});

// PATHS
var pathToConfig = 'src/app/backend/config.js';
var pathToIndexFile = 'src/index.html';
var pathToJsSource = ['src/app/**/*.js', '!'+pathToConfig];
var pathToTemplates = 'src/app/**/*.html';
var pathToLibs = ['src/vendor/**/*.js', 'src/vendor/**/*.css'];
var pathToAssets = 'src/assets/**';

gulp.task('default', ['dev'], function () {
});

gulp.task('dev', function (cb) {
    runSequence('cleanDevFolder', [
        'buildDev',
        'startDevServer',
        'watchSource'
        ], cb);
});

gulp.task('buildDev', [
    'copyLibs',
    'copyAssets',
    'copyConfig',
    'buildJs',
    'copyIndex',
    'cacheTemplates'
]);

gulp.task('cleanDevFolder', function (cb) {
    rimraf('dev', cb);
});

gulp.task('copyLibs', function () {
    return gulp.src(pathToLibs)
        .pipe(copy('dev', {prefix: 1}));
});

gulp.task('copyAssets', function () {
    return gulp.src(pathToAssets)
        .pipe(copy('dev', {prefix: 1}));
});

gulp.task('copyConfig', function () {
    return gulp.src(pathToConfig)
        .pipe(gulp.dest('dev'));
});

gulp.task('buildJs', function () {
    return gulp.src(pathToJsSource)
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dev'))
        .pipe(refresh(lrserver));
});

gulp.task('copyIndex', function () {
    return merge(
        gulp.src(pathToIndexFile)
            .pipe(copy('dev', {prefix: 1})),
        gulp.src(pathToIndexFile)
            .pipe(refresh(lrserver))
    );
});

gulp.task('cacheTemplates', function () {
    return gulp.src(pathToTemplates)
        .pipe(templateCache({module: 'app'}))
        .pipe(gulp.dest('dev'))
        .pipe(refresh(lrserver));
});

gulp.task('startDevServer', function () {
    devServer.listen(serverport);
    lrserver.listen(livereloadport);
    console.log("Dev server listening on port " + serverport);
});

gulp.task('watchSource', function () {
    gulp.watch(pathToJsSource, ['buildJs', 'lint']);
    gulp.watch(pathToIndexFile, ['copyIndex']);
    gulp.watch(pathToTemplates, ['cacheTemplates']);
});

gulp.task('lint', function () {
    return gulp.src(pathToJsSource)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


/////////////////////////////////////
/////////////// PROD ///////////////
///////////////////////////////////


gulp.task('prod', function (cb) {
    return runSequence(
        'cleanProdFolder',
        'buildDev',
        'buildProd',
        'copyAssetsToProd',
        'copyConfigToProd',
        cb
    );
});

gulp.task('prodServer', function (cb) {
    return runSequence(
        'prod',
        'startProdServer',
        cb
    );
});

gulp.task('cleanProdFolder', function (cb) {
    rimraf('prod', cb);
});

gulp.task('buildProd', function () {
    return gulp.src('dev/index.html')
        .pipe(usemin({
            css: [minifyCss()],
            html: [minifyHtml({empty: true})],
            js: [annotate(), uglify(), rev()]
        }))
        .pipe(gulp.dest('prod'));
});

gulp.task('copyAssetsToProd', function () {
    return gulp.src(pathToAssets)
        .pipe(copy('prod', {prefix: 1}));
});

gulp.task('copyConfigToProd', function () {
    return gulp.src(pathToConfig)
        .pipe(gulp.dest('prod'));
});

gulp.task('startProdServer', function (cb) {
    var server = express();
    server.use(express.static('./prod'));
    server.all('/*', function (req, res) {
        res.sendFile('index.html', { root: 'prod' });
    });
    server.listen(serverport);
    console.log("Prod server listening on port " + serverport);
    cb();
});

/////////////////////////////////////
///////////// Deployment ///////////
///////////////////////////////////


gulp.task('deploy', function(cb) {
  rsync({
    ssh: true,
    src: './prod/',
    dest: 'cridev@cybermongo.unige.ch:redmetrics-client',
    exclude: ['config.js'],
    recursive: true,
    syncDestIgnoreExcl: true,
    args: ['--verbose']
  }, function(error, stdout, stderr, cmd) {
      gutil.log(stderr);
      gutil.log(stdout);

      if(error) return cb(error);
      else cb();
  });
});
