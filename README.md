Static
======

A pretty straightforward JSPM and Gulp-powered static site template, using BrowserSync, Autoprefixer, SASS and Preprocess.

# Getting started

You'll need Gulp and JSPM to get the beast running, along with a couple of Node packages.

1. Install Gulp (Run `npm install gulp -g`)
2. Install JSPM (Run `npm install jspm -g`)
3. Initialise JPSM with `jspm install`
4. Get the development node packages with `npm install`

# Build and deploy

Run `gulp build`, to build without deploying.

That'll take your HTML, JS and CSS assets (compiled and minified and made classy) and move them into `/dist`.

You can combine that step with deployment to Github Pages using `gulp-gh-pages`, using the `gulp deploy` command.

# Fire it up locally

Run `gulp`. Celebrate.