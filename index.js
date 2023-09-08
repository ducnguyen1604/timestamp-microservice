// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
app.get('/api', (req, res) => {
  const dateNow = new Date.toUTCString(); // pass unix to eqDate which is inherited from Date object
  const unixNow = Date.parse(dateNow); //convert unix to date string    
  res.json({ unix: unixNow, utc: dateNow }); // save it as object
});
*/
// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;
  const dateStringRegex = /^[0-9]+$/;
  const numbersOnly = dateStringRegex.test(dateString);

  if (!dateString) { //if not provide req date
    const dateNow = new Date().toUTCString(); //take date now
    const unixNow = Date.parse(dateNow); // take unix now
    res.json({ unix: unixNow, utc: dateNow }); //return unix & utc

  } else if (!numbersOnly) { //if req is date
    const unix = Date.parse(dateString); //take unix string from date
    const utc = new Date(unix).toUTCString(); //take utc time string

    unix // if the date is valid (or unix exist)
      ? res.json({ unix: unix, utc: utc }) //return unix & utc
      : res.json({ error: "Invalid Date" }); //invalid ms

  } else { //if req is unix
    const unix = parseInt(dateString); //change unix from string to interger
    if (isNaN(unix)) { //if unix invalid
      res.json({ error: "Invalid Date" });
    } else {
      const actualDate = new Date(unix);
      const utc = actualDate.toUTCString();//take date
      res.json({ unix: unix, utc: utc });
    }
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
