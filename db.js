const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.connect(process.env.mongoURL)
                   .then(() => {
                        console.log("Connected to db")
                   })
                   .catch(() => {
                        console.log("Error connecting to database");
                   })

module.exports = {
    connection
}