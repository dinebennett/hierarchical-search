# Hierarchical-search

Thank you for checking out my hierarchical search demo.

### View Online

To view it online, please go to: http://dinebennett.github.io/hierarchical-search/dist/

**I kindly request that you use Google Chrome to view.**

### Viewing it on your own machine

* Clone my repository: `git clone https://github.com/dinebennett/hierarchical-search.git` 
* navigate to /hierarchical-search/dist
* open index.html in your browser

### Technologies Used

* EmberJS framework (http://emberjs.com/)
* Twitter Bootstrap for basic styling
* Sass CSS preprocessor (see app.scss for modifications to default bootstrap)
* noUiSlider for price range selection (see app/components/range-slider for Ember component)
* Google Fonts for custom fonts
* Github and Github Pages (doh!)

### Wishlist

* Add footer and mention images and "inspired by" ao.com
* More comments in code

### Limitations

**Due to time restrictions my demo has the following limitations:**

* I don't store the user's selection in localStorage, so unfortunately when they refresh their selections are lost.
* I haven't optimized for mobile
* I haven't tested on all browsers - thorough testing was only done on Chrome
* No unit tests or acceptance tests :(
* I don't use an API. Everything is set up in routes/index.js. The route can however fetch data from an API in future.

### Main files for code review

* app/components/range-slider
* app/controllers/index.js
* app/routes/index.js
* app/templates/index.hbs

# Want to install the development version?

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone https://github.com/dinebennett/hierarchical-search.git`
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200/hierarchical-search/](http://localhost:4200/hierarchical-search/).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)
