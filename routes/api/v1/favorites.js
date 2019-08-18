const express = require('express');
const bcrypt = require('bcrypt');
const fetch = require("node-fetch");
const router = express.Router();
const user = require('../../../models').User;
const favorite = require('../../../models/').Favorite;
const Forecast = require('../../../lib/forecast');

router.post('/', function(req, res) {
  if (req.body.api_key !== undefined){
    user.findOne({
      where: {
        apiKey: req.body.api_key
      }
    }).then(user => {
    let location = req.body.location.split(', ')
    if (location.length === 2 && location[1].length === 2) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?components=locality:${location[0]}|administrative_area:${location[1]}&key=${process.env.GOOGLE_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        let coordinates = data["results"][0]["geometry"]["location"]
        favorite.findOrCreate({
          where: {
            location: req.body.location
          },
          location: req.body.location,
          latitude: coordinates["lat"],
          longitude: coordinates["lng"],
          UserId: user.id
        })
        .then(([favorite, created]) => {
          if (created) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify({message: `${req.body.location} has been added to your favorites`}));
          } else {
            res.setHeader("Content-Type", "application/json");
            res.status(406).send(JSON.stringify({error: `${req.body.location} is already in your favorites`}));
          }
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(401).send(JSON.stringify({error: "Invalid Information"}));
        });
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify({error: "Invalid Information"}));
      });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({error: "Invalid Information"}));
    }})
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({error: "Invalid Information"}));
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: "Invalid Information"}));
  };
});

router.get('/', function(req, res) {
  if (req.body.api_key !== undefined){
    favorite.findAll({
      where: {
        '$user.apiKey$': req.body.api_key
      },
      include: ['user']
    }).then(favorites => {
      if(favorites !== undefined){
        let forecast = new Forecast()
        favorites.forEach(function(city){
          fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${city["dataValues"]["latitude"]},${city["dataValues"]["longitude"]}?exclude=minutely,hourly,daily`)
          .then(res => res.json())
          .then(data => {
            forecast.addFavorite(data, city["dataValues"]["location"])
          })
          .catch(error => {
            res.setHeader("Content-Type", "application/json");
            res.status(401).send(JSON.stringify({error}));
          });
        })
        setTimeout(function(){
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify(forecast.favoritesForecast()));
        }, 500)
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify({error: "No favorites cities found"}));
      }
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
