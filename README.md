# Aces Up
### Overview
We've added node, yarn, and webpack to the project to compile our javascript front end in React Js. 
There are Maven goals to download all of these dependencies and migrate the bundled 
React App to the `src/main/java/assets/js` folder during the build process, making them available to the client.
Don't worry if it takes a little while for the build to finish the first time, it's just installing dependencies.
### Development Environment
You can open up the `src/main/webapp/js` in a different text editor, preferably one which support .js files and
develop in the sub-project environment, dubbed `aces-up-front-endV0.1.0` in the package.json. I have yarn and node 
installed globally and you should do the same, even though the executables are installed right into our project the first time you 
run the Java project. Open up a shell in this directory and the
available commands are:
```
$ // runs a webpack-dev-server from the `src/main/webpack/js/dist/` folder
$ yarn start 
```
```
$ // transpiles a new version of the project and puts it in`src/main/webapp/js/dist/`
$ yarn build 
```
The latter of which is used during the build step of the main project. For all intents and purposes, you can just run the project normally
and add css in the `*.css` files found in `src/main/java/assets/css` directory. It may be quicker to develop using the webpack-dev-sever
and totally bundle all of our `.css` with the `.js` as modules. Either way we're writing plain `.css`.
