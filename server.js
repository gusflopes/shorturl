require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(process.env.APP_PORT || 5000);