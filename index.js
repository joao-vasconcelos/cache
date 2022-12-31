/* * */
/* * */
/* * * * * */
/* DBCONTROL */
/* * */
/* * */

const CACHE_TTL_IN_SECONDS = 10;

/* * */
/* IMPORTS */
const express = require('express');
const app = express();
const database = require('./database');
const KV = require('./KV');

app.get('/*', async (req, res) => {
  //

  // Get cache object from query
  const cachedObject = await KV.findOne({ key: req.originalUrl });

  if (cachedObject && cachedObject.storedAt + CACHE_TTL_IN_SECONDS * 1000 > Date.now()) {
    // If object is in cache
    console.log('Sending cached value');
    res.send(cachedObject.value);
  } else {
    // fetch the API
    const response = await fetch('https://teste.carrismetropolitana.pt' + req.originalUrl, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
    const body = await response.text();

    // Save to cache
    await KV.findOneAndUpdate({ key: req.originalUrl }, { value: body, storedAt: Date.now() }, { upsert: true });

    // return the response
    console.log('Sending fresh value');
    res.send(body);
  }
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 5050;
app.listen(PORT, async () => {
  console.log(`Example app listening on port ${PORT}`);
  await database.connect();
});
