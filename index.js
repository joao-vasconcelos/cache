/* * */
/* * */
/* * * * * */
/* DBCONTROL */
/* * */
/* * */

/* * */
/* IMPORTS */
const express = require('express');
const app = express();
const database = require('./database');
const KV = require('./KV');

app.get('/admin-ajax.php', async (req, res) => {
  //

  // Filter bad characters
  for (let key in req.query) {
    req.query[key] = req.query[key].replace(/[^a-zA-Z0-9_%:-]/g, '');
  }

  res.set({
    'Content-Type': 'application/json',
    'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:",
    'Access-Control-Allow-Origin': '*',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex',
  });

  const cacheKey = new URLSearchParams(req.query).toString();

  // Get cache object from query
  const cachedObject = await KV.findOne({ key: cacheKey });

  if (cachedObject) {
    // If object is in cache
    console.log('Cache HIT:', cacheKey);
    res.append('X-Ricky-Cache', 'HIT');
    res.send(cachedObject.value);
  } else {
    try {
      // fetch the API
      const response = await fetch('https://teste.carrismetropolitana.pt/wp-admin/admin-ajax.php?' + cacheKey, {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      });

      let body = await response.json();
      delete body.sql;
      body = JSON.stringify(body);

      // Save to cache
      await KV.findOneAndUpdate({ key: cacheKey }, { value: body }, { upsert: true });

      // return the response
      console.log('Cache MISS:', cacheKey);
      res.append('X-Ricky-Cache', 'MISS');
      res.send(body);
    } catch (err) {
      console.log('- - - Error - - -');
      console.log('At key:', cacheKey);
      console.log(err);
      console.log('- - - Error - - -');
      res.status(500).send();
    }
  }
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 5050;
app.listen(PORT, async () => {
  console.log(`Cache listening on port ${PORT}`);
  await database.connect();
});
