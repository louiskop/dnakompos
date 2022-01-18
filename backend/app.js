// package imports
const { application } = require('express');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// import routes
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');

// import middleware
const errorMiddleware = require('./middleware/errors');

// configure json
app.use(express.json());

// configure cookie parser
app.use(cookieParser());

// configure routes
app.use('/api/', productRoutes);
app.use('/api/', userRoutes);
app.use('/api/', orderRoutes);

// configure middleware
app.use(errorMiddleware);

// export express func
module.exports = app;