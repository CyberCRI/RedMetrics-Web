RedMetrics-client
=================

Client-side web app that provides a UI for querying data stored in a [RedMetrics](https://github.com/CyberCRI/RedMetrics) server.

RedMetrics client is written in AngularJS, using Gulp as a build tool.

To develop locally:
  1. Clone or download the repository, then `cd` in the directory.
  2. Run `npm install` and `bower install` to fetch the dependencies.
  3. Configure RedMetrics-client to target a RedMetrics instance. Copy the file [/src/app/backend/config.js.sample](https://github.com/CyberCRI/RedMetrics-client/blob/master/src/app/backend/config.js.sample) to `/src/app/backend/config.js` and modify it to target the host and port of RedMetrics.
  4. Run `gulp dev` to start up a development server that updates as soon as files are changed. You can see the result at [http://localhost:5005](http://localhost:5005).
  5. When ready to deploy, use `gulp prod` to test the production server, using optimized and minified code.
