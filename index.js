/**
 *
 * Author:  George Simos - georgesimos.com
 *
 * License: Copyright (c) 2019 George Simos
 * @link https://github.com/georgesimos/nodejs-starter
 *
 */

const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const expressStatusMonitor = require('express-status-monitor');

/* Make all variables from our .env file available in our process */
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.example' });
}

/* Init express server */
const app = express();

/**
 * Connect to MongoDB.
 */
require('./config/mongoose');

/* Here we setup the middlewares & configs */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');
app.use(expressStatusMonitor());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* Here we define the api routes */
app.use(require('./routes/users'));

const port = process.env.PORT || 8080;
const address = process.env.SERVER_ADDRESS || 'localhost';

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server running on http://${address}:${port}`));
