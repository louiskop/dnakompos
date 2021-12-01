
// package imports
const dotenv = require('dotenv');

// internal imports
const app = require('./app');
const connectDB = require('./config/database');

// load config file
dotenv.config({path : 'backend/config/config.env'});

// connect to database
connectDB();

// start the server
app.listen(
    process.env.PORT,
    4001,
    () => {
        console.log(`[+] Server running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
    }
);
