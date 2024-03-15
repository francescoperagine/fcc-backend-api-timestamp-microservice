var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  if(!date) {
    return res.json({
      "unix": new Date().getTime(),
      "utc": new Date().toUTCString()
    });
  }
  
    if(!isNaN(date) && isFinite(date)) {
    const ts = parseInt(date);
    const utcDate = new Date(ts);
    return res.json({
      "unix": ts,
      "utc": utcDate.toUTCString()
    });
  }

  const parsedDate = new Date(date);
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
    
  return res.json({
    "unix": parsedDate.getTime(),
    "utc": parsedDate.toUTCString()
  });
  
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
