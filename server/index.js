require('dotenv').config();
const fs          = require('fs');
const path        = require('path');
const morgan      = require('morgan');
const express     = require('express');
const bodyParser  = require('body-parser');
const compression = require('compression');

const app = express();
const api = require('./api');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 60606;

const serverRoot = path.join(__dirname, '..', 'dist');
const apiRoot = '/api';

const reactRoutes = ['*'];

// Configure Express middleware:
app.use(bodyParser.json());
if (env === 'production') {
  // GZIP for less bytes down the wire
  app.use( compression() );
  
  // Configure logging
  const logDir = path.join(__dirname, 'logs');
  // Create the logs directory if it doesn't already exist
  fs.existsSync(logDir) || fs.mkdirSync(logDir);
  const logStream = fs.createWriteStream(path.join(logDir, 'access.log'), {flags: 'a'});
  app.use(
    morgan('combined', {stream: logStream})
  );
}

// Register the API routes at /api
app.use(apiRoot, api);

// Tell express where the base should be for static files,
// like images, js, css, index.html etc
app.use('/s', express.static(serverRoot));

// Always send the index file for routes in the react app. Let React handle the routing
app.get(reactRoutes, require('./api/index-handler'));


app.listen(port, () => {
  console.log(`🌈   HTTP Server is listening on port ${port} ENV: ${env}`);
});
