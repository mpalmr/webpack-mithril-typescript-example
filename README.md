# Example: Webpack Mithril Typescript

This repository is an example of project that makes use of said technologies. This setup is strongly suited towards large and scalable SPAs (single page apps), rather than simple apps and presentational websites. This example will not explain how to use each of these tools in depth but instead provide a simple example of how you can use them together to make an app with the use of them. Feel free to clone this repository and use it as a boilerplate for anything you wish to use.



## Stack Overview

### [Webpack](https://webpack.github.io/)
The main build tool we'll be using to transform and handle our assets such as our TypeScript, Sass, and HTML. It will allow us to use [ES6 module syntax](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-modules/) using `import` and `export`. Please keep in mind the [WHATWG Module Loader Specification](https://whatwg.github.io/loader/) is incomplete and subject to change. The configuration used in this project is fairly complex but shouldn't need to be altered much outside of the [file manifest](https://github.com/mpalmr/webpack-mithril-typescript-example/blob/master/buildConfig/manifest.json).


### [Mithril](mithril.js.org)
Mithril may not be very popular but it's very lightweight, minimal, and performant which already makes it a good candidate for a large scale app. Additionally it implements very similar templating to [React](https://facebook.github.io/react/)'s which is very popular for front end web application development right now, all while providing a bare bones.

Instead of only being a view library like React is, Mithril implements the MVC design pattern. Its implementation of MVC is so loose that it's quite easy to coax it into more of an MVVM, or whatever architecture pattern you prefer. It only requires a view at the core and doesn't really do much to implement models.


### [TypeScript](https://www.typescriptlang.org/)
A superset of JavaScript with static typing. Catches mismatched types at compile time to help reduce uncaught bugs and encourage good coding habits.


### [Sass](http://sass-lang.com/)

***This configuration won't support the old Sass syntax!***

SCSS is a superset of CSS, much like how TypeScript is a superset of JavaScript. It's very popular among front end web devs and is the most popular CSS pre-processor out there. It should be fairly easy to edit the configuration to swap Sass out for any other popular pre-processor.

Through the use of Webpack we are able to modularize our styles into modules we `import` via TypeScript which are then automatically bundled into a CSS file. This means if we don't use a particular application module, the CSS associated with it won't be compiled into te project.


### [PostCSS](http://postcss.org/)
Transforms CSS through the use of configurable modules. Currently this example only uses PostCSS to automatically add or remove vendor prefixes using [autoprefixer](https://github.com/postcss/autoprefixer).


### Unit Testing
Basic unit testing is possible within this repository through the usage of Karma, Mocha, and Chai.