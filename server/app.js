const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
const { MONGOURI } = require('./key');

// config db
mongoose.Promise = global.Promise;
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('success connect to mongodb!!'))
  .catch(err => console.error(err));

const customMiddleware = (req, res, next) => {
  console.log("Middleware executed!!");
  next();
};

app.get('/', (req, res) => {
  console.log('it is index.')
  res.send('Helo Piscki!');
});

app.get('/about', customMiddleware, (req, res) => {
  console.log('it is about.')
  res.send('it is about page.');
});

app.listen(PORT, () => console.log('server running on', PORT));