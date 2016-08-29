***WARNING: THIS PROJECT AND DOCS ARE INCOMPLETE***

# Example: Webpack Mithril Typescript

This repository is an example of project that makes use of said technologies. This setup is strongly suited towards large and scalable SPAs (single page apps), rather than simple apps and presentational websites. This example will not explain how to use each of these tools in depth but instead provide a simple example of how you can use them together to make an app with the use of them. Feel free to clone this repository and use it as a boilerplate for anything you wish to use.



## Stack Overview

### [Webpack](https://webpack.github.io/)
The main build tool we'll be using to transform and handle our assets such as our TypeScript, Sass, and HTML. It will allow us to use [ES6 module syntax](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-modules/) using `import` and `export`. Please keep in mind the [WHATWG Module Loader Specification](https://whatwg.github.io/loader/) is incomplete and subject to change. The configuration used in this project is fairly complex but shouldn't need to be altered much outside of the [file manifest](https://github.com/mpalmr/webpack-mithril-typescript-example/blob/master/buildConfig/manifest.json).

Although this is the only build tool used in this example, the usage of a task runner such as [Gulp](http://gulpjs.com/), [Grunt](http://gruntjs.com/), or [Make](https://www.gnu.org/software/make/manual/make.html), isn't neccessarily a bad idea. Task runners are great for **any** automated task while Webpack is explicitly for transforming and handling front end web assets.


### [Mithril](mithril.js.org)
Mithril may not be very popular but it's very lightweight, minimal, and performant which already makes it a good candidate for a large scale app. Additionally it implements very similar templating to [React](https://facebook.github.io/react/)'s which is very popular for front end web application development right now, all while providing a bare bones.

Instead of only being a view library like React is, Mithril implements the MVC design pattern. Its implementation of MVC is so loose that it's quite easy to coax it into more of an MVVM, or whatever architecture pattern you prefer. It only requires a view at the core and doesn't really do much to implement models.


### [TypeScript](https://www.typescriptlang.org/)
A superset of JavaScript with static typing. Catches mismatched types at compile time to help reduce uncaught bugs and encourage good coding habits.


### Other
* [Sass](http://sass-lang.com/)
* [PostCSS](http://postcss.org/)
* Unit testing: ([Karma](https://karma-runner.github.io/1.0/index.html), [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/))



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