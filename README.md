# Example: Webpack Mithril Typescript

This repository is an example of project that makes use of said technologies. This setup is strongly suited towards SPA (single page apps), rather than presentational websites. This example will not explain how to use each of these tools in depth but instead provide a simple example of how you can use them together to make an app with the use of them. Feel free to clone this repository and use it as a boilerplate for anything you wish to use.


## Stack Overview

### [Webpack](https://webpack.github.io/)
The main build tool we'll be using to transform and handle our assets such as our TypeScript, Sass, and HTML. It will allow us to use [ES6 module syntax](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-modules/) using `import` and `export`. Please keep in mind the [WHATWG Module Loader Specification](https://whatwg.github.io/loader/) is incomplete and subject to change. The configuration used in this project is fairly complex but shouldn't need to be altered much outside of the [file manifest](https://github.com/mpalmr/webpack-mithril-typescript-example/blob/master/buildConfig/manifest.json).

### [Mithril](mithril.js.org)
A minimal front end MVC framework written in JavaScript. Mithril is **very** minimal in that it only implements an extreamly bare bones MVC workflow. What seperates it from other frameworks though is it renders views / templates in [React](https://facebook.github.io/react/)-like views.

### [TypeScript](https://www.typescriptlang.org/)
A superset of JavaScript with static typing. Catches mismatched types at compile time to help reduce uncaught bugs and encourage good coding habits.