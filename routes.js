const express = require('express');

const app = express();

app.get('/health', (req, res) => {
  res.send('Hello I\'m healthy');
});

module.exports = app;
