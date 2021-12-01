
// package imports
const mongoose = require('mongoose');

// connect to database
const connectDB = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }).then(con => console.log(`[+] MongoDB connected with host = ${con.connection.host}`));
};

// export database connection
module.exports = connectDB;