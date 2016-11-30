const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const onSwitch = true;

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials');

//////////////////////////////////////////////////////////////////////
// M I D D L E W A R E
//////////////////////////////////////////////////////////////////////

app.use((req, res, next) => {
  if(onSwitch){
    var time = new Date().toString();
    var log = `${time};${req.method};${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n');
    next();
  } else {
    res.render('maintenance.hbs');
  }
});

app.use(express.static(__dirname+'/public'));
//////////////////////////////////////////////////////////////////////
// H E L P E R S
//////////////////////////////////////////////////////////////////////

hbs.registerHelper('getYear', () => {
  return new Date().getFullYear();
});

//////////////////////////////////////////////////////////////////////
// R O U T I N G   F U N C T I O N S
//////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Doesnt get better than this folks!'
  });
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'Welcome to the future of web technology!'
  });
})

//////////////////////////////////////////////////////////////////////
// L I S T E N E R
//////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Server up on port numer ${port}`)
})
