***WARNING: THIS PROJECT AND DOCS ARE INCOMPLETE***

# Example: Webpack Mithril Typescript

This repository is an example of project that makes use of said technologies. This setup is strongly suited towards large and scalable SPAs (single page apps), rather than simple apps and presentational websites. This example will not explain how to use each of these tools in depth but instead provide a simple example of how you can use them together to make an app with the use of them. Feel free to clone this repository and use it as a boilerplate for anything you wish to use.



## Stack Overview

* [Webpack](https://webpack.github.io/): Allows each asset in a project to be used as a JavaScript module. This includes not only JavaScript and TypeScript files, but also SCSS are supported with the provided configuration.
* [Mithril](mithril.js.org): A minimal JavaScript MVC library that provides React-like templating.
* [TypeScript](https://www.typescriptlang.org/): A superset of JavaScript. It brings features that compliment large code bases such as [static typing](https://www.typescriptlang.org/docs/handbook/basic-types.html) and [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html).
* [Sass (SCSS)](http://sass-lang.com/): A popular superset of CSS that makes it easier to write modular styles and brings features such as [variables](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#variables_) and [mixins](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins). Additionally this project uses [PostCSS](http://postcss.org/) with [autoprefixer](https://github.com/postcss/autoprefixer).
* Units are in: [Karma](https://karma-runner.github.io/1.0/index.html), [Mocha](https://mochajs.org/), and [Chai](http://chaijs.com/).



## Installation

### Prerequisites
Assuming you're running a recent version of NodeJS and git, please ensure the following packages are installed globally before trying to use this as boilerplate:

* [node-gyp](https://www.npmjs.com/package/node-gyp-install)
* [tslint](https://www.npmjs.com/package/tslint)
* [typescript](https://www.npmjs.com/package/typescript)

`npm install -g node-gyp tslint typescript`


### Installation
After navigating to the directory you wish to clone this repository into, run the following commands in order:

1. `git clone git@github.com:mpalmr/webpack-mithril-typescript-example.git`
2. `cd webpack-mithril-typescript-example`
3. `npm install`


## Usage

### npm Scripts
All project tasks are evoked via [npm scripts](https://docs.npmjs.com/misc/scripts). `webpack` and `webpack-dev-server` should never be evoked directly from the command line.

* Start development server: `npm start`
* Production build: `npm run build`
* Run unit tests: `npm test`
* Generate TypeScript linting report: `npm run lint`
* Generate Webpack stats: `npm run stats`



## Build Details