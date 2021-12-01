// package imports
const { application } = require('express');
const express = require('express');
const app = express();

// import routes
const productRoutes = require('./routes/product');

// configure json
app.use(express.json());

// configure routes
app.use('/api/', productRoutes);

// export express func
module.exports = app;