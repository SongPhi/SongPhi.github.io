var Metalsmith  = require('metalsmith');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var drafts     = require('metalsmith-drafts');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');

Metalsmith(__dirname)         // __dirname defined by node.js:
                              // name of current working directory
  .metadata({                 // add any variable you want
                              // use them in layout-files
    sitename: "My Static Site & Blog",
    siteurl: "http://example.com/",
    description: "It's about saying »Hello« to the world.",
    generatorname: "Metalsmith",
    generatorurl: "http://metalsmith.io/"
  })
  .source('./src')            // source directory
  .destination('./build')     // destination directory
  .clean(true)                // clean destination before
  .use(collections({          // group all blog posts by internally
    posts: '*.md'        // adding key 'collections':'posts'
  }))                         // use `collections.posts` in layouts
  .use(drafts())
  .use(markdown())            // transpile all md into html
  .use(layouts({
    "default": "default.hbs"
  }))             // wrap layouts around html
  .build(function(err) {      // build process
    if (err) throw err;       // error handling is required
  });
