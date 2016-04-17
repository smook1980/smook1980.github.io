const metalsmith = require('metalsmith');

const sass = require('metalsmith-sass');
const serve = require('metalsmith-serve');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const browserSync = require('metalsmith-browser-sync');
const autoprefixer = require('metalsmith-autoprefixer');


metalsmith(__dirname)
  .source("site/content")
  .destination('build/')
  .use(markdown({
    smartypants: true,
    gfm: true,
    tables: true
  }))
  .use(layouts({
    engine: 'jade',
    directory: 'site/layout',
    partials: 'site/layout/partials'
  }))
  .use(sass({
    outputStyle: "expanded",
    sourceMap: true,
    sourceMapContents: true
  }))
  .use(autoprefixer())
  .use(permalinks({
    pattern: ':permalink'
  }))
  .use(browserSync({
    server : "build",
    files  : ["site/content/**/*.md", "site/layout/**/*.jade", "site/layout/**/*.scss"]
  }))
  // .use(serve({
  //   port: 8080,
  //   verbose: true,
  //   http_error_files: {
  //     //404: "/404.html"
  //   },
  //   redirects: {
  //   }
  // }))
  .build(function(err) {
    if (err) { throw err; }
  });
