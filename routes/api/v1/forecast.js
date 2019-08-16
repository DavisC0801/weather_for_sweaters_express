const express = require('express');
const fetch = require("node-fetch");
const router = express.Router();
const user = require('../../../models').User;
const Forecast = require('../../../lib/forecast');

router.get('/', function(req, res) {
  if (req.body.api_key !== undefined){
    user.findOne({
      where: {
        apiKey: req.body.api_key
      }
    }).then(user => {
      let location = req.query.location.split(',')
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?components=locality:${location[0]}|administrative_area:${location[1]}&key=${process.env.GOOGLE_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        let coordinates = data["results"][0]["geometry"]["location"]
        fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${coordinates["lat"]},${coordinates["lng"]}?exclude=minutely`)
        .then(res => res.json())
        .then(data => {
          res.setHeader("Content-Type", "application/json");
          let forecast = new Forecast(data, location)
          res.status(200).send(JSON.stringify(forecast.cityForecast));
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send(JSON.stringify(error));
        });
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send(JSON.stringify(error));
      });
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({error: "Invalid Information"}));
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: "Invalid Information"}));
  };
});

module.exports = router;
