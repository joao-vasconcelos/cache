/* * */
/* * */
/* * * * * */
/* DBCONTROL */
/* * */
/* * */

/* * */
/* IMPORTS */
require('dotenv').config();
const database = require('./services/database');
const Transaction = require('./models/Transaction');

(async () => {
  console.log();
  console.log('-----------------------------------------');
  console.log(new Date().toISOString());
  console.log('-----------------------------------------');
  console.log();

  // Store start time for logging purposes
  const startTime = process.hrtime();

  console.log('Starting...');

  await database.connect();

  // Get all transactions
  const transactions = await Transaction.find({});

  // If response is empty,
  // no new transactions to control
  if (!transactions.length) console.log('Found 0 transactions.');
  else console.log(`Preparing ${transactions.length} transactions...`);

  let transactionCounter = 0;

  // For each transaction
  for (const t of transactions) {
    transactionCounter++;
    process.stdout.write(`Modified transaction ${transactionCounter} of ${transactions.length} [_id: ${t._id}]\r`);
  }

  // Clear console line
  process.stdout.write('                                                                                       \r');
  console.log('Done.');

  await database.disconnect();

  console.log();
  console.log('- - - - - - - - - - - - - - - - - - - - -');
  console.log('Updated ' + transactionCounter + ' out of ' + transactions.length + ' transactions.');
  console.log('Operation took ' + getDuration(startTime) / 1000 + ' seconds.');
  console.log('- - - - - - - - - - - - - - - - - - - - -');
  console.log();
})();

/* * */
/* Returns a time interval for a provided start time. */
const getDuration = (startTime) => {
  const interval = process.hrtime(startTime);
  return parseInt(
    // seconds -> miliseconds +
    interval[0] * 1000 +
      // + nanoseconds -> miliseconds
      interval[1] / 1000000
  );
};
