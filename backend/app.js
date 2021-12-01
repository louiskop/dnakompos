// package imports
const { application } = require('express');
const express = require('express');
const app = express();

// import routes
const products = require('./routes/product');

// configure json
app.use(express.json());

// configure routes
app.use('/api/', products);

// export express func
module.exports = app;