const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

mongoose.connect('mongodb://localhost/urlshort', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req,res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls });
})

app.post('/shorten', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect('/')
});
app.delete('/shorten/:shortUrl', async (req, res) => {
  console.log('rota delete chamada');
  await ShortUrl.findOneAndDelete({ shortUrl: req.params.shortUrl }, function(err) {
    if (err) console.log(err);
    console.log('url deletada');
    res.status(204).send()
  })
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl })
  if (!shortUrl) return res.sendStatus(404)

  console.log('headers', req.headers);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
})


app.listen(process.env.APP_PORT || 5000);