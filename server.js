const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
///////////////////////////////////
///////////////////////////////////
const port = process.env.PORT || 3000;
let app = express();
///////////////////////////////////
///////////////////////////////////
app.set('viewEngine', 'hbs');
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
          console.log('Unable to connet to server!');
    }
  })
  console.log(log);
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
///////////////////////////////////
///////////////////////////////////
hbs.registerPartials(__dirname + '/views/partial');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
///////////////////////////////////
///////////////////////////////////
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    greeting: 'Hello, there! this is my home page.'
  })
});
app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    greeting: 'Hello, person! Welcome to my about page.'
  });
});
app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to connect to server.'
  });
});
app.get('/help', (req, res) => {
  res.render('help.hbs');
});
app.get('/projects', (req, res) => {
  res.render('projects.hbs');
});
///////////////////////////////////
///////////////////////////////////
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
