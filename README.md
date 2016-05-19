# RedMetrics-Web

Client-side web app that provides a UI for querying data stored in a [RedMetrics](https://github.com/CyberCRI/RedMetrics) server.

RedMetrics-Web is written in AngularJS, using Gulp as a build tool.

To develop locally:
  1. Clone or download the repository, then `cd` in the directory.
  2. Run `npm install` and `bower install` to fetch the dependencies.
  3. Until [issue #5](https://github.com/CyberCRI/RedMetrics-Web/issues/5) is fixed, you need to manually download [formly.vanilla.js](https://raw.githubusercontent.com/gonimbly/angular-formly/master/dist/formly.vanilla.js) to the `src/vendor/angular-formly/dist/` directory. 
  4. Configure RedMetrics-Web to target a RedMetrics instance. Copy the file [/src/app/backend/config.js.sample](https://github.com/CyberCRI/RedMetrics-Web/blob/master/src/app/backend/config.js.sample) to `/src/app/backend/config.js` and modify it to target the host and port of RedMetrics.
  5. Run `gulp dev` to start up a development server that updates as soon as files are changed. You can see the result at [http://localhost:5005](http://localhost:5005).
  6. When ready to deploy, use `gulp prod` to test the production server, using optimized and minified code.

## Configuration

You will also need to configure RedMetrics-Web to target your RedMetrics instance. Copy the sample configuration file [/src/app/backend/config.js.sample](https://github.com/CyberCRI/RedMetrics-Web/blob/master/src/app/backend/config.js.sample) to `/src/app/backend/config.js`. 

You can then modify `/src/app/backend/config.js` to connect to the correct instance of the server. 
