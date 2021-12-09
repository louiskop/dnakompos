// package imports
const { application } = require('express');
const express = require('express');
const app = express();

// import routes
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

// import middleware
const errorMiddleware = require('./middleware/errors');

// configure json
app.use(express.json());

// configure routes
app.use('/api/', productRoutes);
app.use('/api/', userRoutes)

// configure middleware
app.use(errorMiddleware);

// export express func
module.exports = app;