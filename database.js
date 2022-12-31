/* * * * * */
/* DATABASE */
/* * */

/* * */
/* IMPORTS */
require('dotenv').config();
const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

exports.connect = async function () {
  console.log(`STRING: mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`);
  await mongoose
    .set('strictQuery', true)
    .connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`)
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
