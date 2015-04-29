var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');
var bs = require('browser-sync');

// the paths to app files
var paths = {
  // all client app js files, not including 3rd party js files
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'index.html'],
  styles: ['client/styles/*']
};

// Use browser sync to automatically refresh page on client side file save
gulp.task('start', ['serve'],  function () {
  bs({
    notify: true,
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.styles),
    proxy: 'localhost:8000'
  });
});

// start our node server using nodemon
gulp.task('serve', function() {
  nodemon({script: 'index.js', ignore: ['node_modules/**/*.js', 'server/*', '*']});
});

// watch all stylus files for changes and compile to css
gulp.task('render', shell.task(['stylus -w client/styles/main.styl']));

// call start and render
gulp.task('default', ['start', 'render']);
