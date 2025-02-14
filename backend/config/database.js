const mongoose = require('mongoose');
require('dotenv').config();

const {MONGODB_URL} = process.env;

exports.connect = () => {
    mongoose
        .connect(MONGODB_URL)
        .then(console.log('Database connection successful'))
        .catch((err) => {
            console.log('Database Connection Failed');
            console.log(err);
            process.exit(1);
        })
}