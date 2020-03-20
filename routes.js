const { Router } = require('express');
const ShortUrl = require('./models/shortUrl');


const routes = new Router();

routes.get('/', async (req,res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls });
});

routes.post('/shorten', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect('/')
});
routes.delete('/shorten/:shortUrl', async (req, res) => {
  console.log('rota delete chamada');
  await ShortUrl.findOneAndDelete({ shortUrl: req.params.shortUrl }, function(err) {
    if (err) console.log(err);
    console.log('url deletada');
    res.status(204).send()
  })
})

routes.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl })
  if (!shortUrl) return res.sendStatus(404)

  console.log('headers', req.headers);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
})


module.exports = routes;