/* * * * * */
/* DATABASE */
/* * */

/* * */
/* IMPORTS */
require('dotenv').config();
const mongoose = require('mongoose');

exports.connect = async function () {
  await mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('Connected to MongoDB.'))
    .catch((error) => {
      console.log('Connection to MongoDB failed.');
      console.log('At database.js > mongoose.connect()');
      console.log(error);
      process.exit();
    });
};

exports.disconnect = async function () {
  await mongoose
    .disconnect()
    .then(() => console.log('Disconnected from MongoDB.'))
    .catch((error) => {
      console.log('Failed closing connection to MongoDB.');
      console.log('At database.js > mongoose.disconnect()');
      console.log(error);
    });
};
