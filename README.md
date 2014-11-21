RedMetrics-client
=================

Client-side web app that provides a UI for querying data stored in a [RedMetrics](https://github.com/CyberCRI/RedMetrics) server.

RedMetrics client is written in AngularJS, using Gulp as a build tool.

To develop locally:
  1. Clone or download the repository, then `cd` in the directory.
  2. Run `npm install` and `bower install` to fetch the dependencies.
  3. Run `gulp dev` to start up a development server that updates as soon as files are changed. You can see the result at [http://localhost:5000](http://localhost:5000).
  4. When ready to deploy, use `gulp prod` to test the production server, using optimized and minified code.

You will also need to configure RedMetrics-client to target your RedMetrics instance. Currently this is done using by changing the 2nd line of [/src/app/backend/backend.js](https://github.com/CyberCRI/RedMetrics-client/blob/master/src/app/backend/backend.js), for example `.constant('SERVER_URL', 'http://localhost:4567/v1/')`.
