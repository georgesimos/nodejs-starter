<h1 align="center">
nodejs-starter
</h1>
<p align="center">
MongoDB, Expressjs, Nodejs
</p>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/georgesimos/nodejs-starter/blob/master/LICENSE)

Nodejs Starter is a boilerplate for Node.js web applications built with:

- [MongoDB](https://www.mongodb.com/) - A document-oriented, No-SQL database used to store the application data.
- [ExpressJS](https://expressjs.com/) - fast node.js network app framework.
- [nodeJS](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine
- Authentication with [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## Features

- **Authentication** using Email and Password
- Add / Update / Delete Users

## Getting Started

clone the repository

```sh
$ git clone https://github.com/georgesimos/nodejs-starter.git myproject
$ cd myproject
```

Install the dependencies and devDependencies

```sh
$ npm install
```

Set environment variables

```sh
cp .env.example .env
```

Start the server

```sh
$ npm start
$ npm run dev # with nodemon live update
```

## Application Structure

```
app
├── config
│   └── auth.js
│   └── mongoose.js
├── models
│   └── Users
├── routes
│   └── api
│    │   └── auth.js
│    │   └── users.js
│    └── index.js      
└── index.js
```

- <b>index.js</b> - The application entry point. This file defines our express server and connects it to MongoDB using mongoose. It also defines the api routes.
- <b>config/ </b> - This folder contains configuration for mongoose and Auth middleware.
- <b>models/</b> - This folder contains the Schema definitions for our Mongoose Models.
- <b>routes/ </b> - This folder contains the route definitions for our API.



## Plugins

nodejs-starter is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

## Server

| Plugin                 | README                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| bcryptjs               | [plugins/bcryptjs/README.md](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md)                                  |
| chalk                  | [plugins/chalk/README.md](https://github.com/chalk/chalk/blob/master/readme.md)                                           |
| dotenv                 | [plugins/dotenv/README.md](https://github.com/motdotla/dotenv/blob/master/README.md)                                      |
| express                | [plugins/express/README.md](https://github.com/expressjs/express/blob/master/Readme.md)                                   |
| express-status-monitor | [plugins/express-status-monitor/README.md](https://github.com/RafalWilinski/express-status-monitor/blob/master/README.md) |
| jsonwebtoken           | [plugins/jsonwebtoken/README.md](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md)                        |
| mongoose               | [plugins/mongoose/README.md](https://github.com/Automattic/mongoose/blob/master/README.md)                                |
| morgan                 | [plugins/morgan/README.md](https://github.com/expressjs/morgan/blob/master/README.md)                                     |
| nodemon                | [plugins/nodemon/README.md](https://github.com/remy/nodemon/blob/master/README.md)                                        |

## License

MIT
