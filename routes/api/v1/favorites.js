const express = require('express');
const bcrypt = require('bcrypt');
const fetch = require("node-fetch");
const router = express.Router();
const user = require('../../../models').User;
const favorite = require('../../../models/').Favorite;

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
        favorite.create({
          location: req.body.location,
          latitude: coordinates["lat"],
          longitude: coordinates["lng"],
          UserId: user.id
        });
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify({message: `${req.body.location} has been added to your favorites`}));
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

module.exports = router;
