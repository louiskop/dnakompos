
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
const server = app.listen(
                    process.env.PORT,
                    4001,
                    () => {
                        console.log(`[+] Server running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
                    }
                );

// unhandled promise rejections
process.on('unhandledRejection', (err) => {

    // print errors
    console.log(`[-] ERROR: ${err.message}`);
    console.log("[-] Shutting down server: unhandled promise rejection");

    // shut the server down
    server.close(() => {
        process.exit(1);
    });    

});