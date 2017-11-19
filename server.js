const express = require('express');
const fs = require('fs');

var app = express();
const hbs = require('hbs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n', (err) => {
    console.log('Unable to append to server.log');
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page.',
    message: 'Welcome to this website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.get('/bad', (req, res) => {
  var d= new Date();
  d = d.toString();
  res.send({
    date: d,
    errorMessage: 'Unable to complete request'
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
