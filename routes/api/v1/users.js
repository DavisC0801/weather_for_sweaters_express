const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const router = express.Router();
const user = require('../../../models').User;

router.post('/', function(req, res) {
  if (req.body.email !== undefined){
    user.findOne({
      where: {
        email: req.body.email
      }
    }).then(existingUser => {
      if (req.body.password === req.body.password_confirmation && existingUser === null){
        bcrypt.hash(req.body.password, 10)
        .then(password => {
          user.create({
            email: req.body.email,
            password: password,
            apiKey: crypto.randomBytes(14).toString('hex')
          })
          .then(user => {
            res.setHeader("Content-Type", "application/json");
            res.status(201).send(JSON.stringify({api_key: user.apiKey}));
          })
          .catch(error => {
            res.setHeader("Content-Type", "application/json");
            res.status(500).send(JSON.stringify({error}));
          });
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send(JSON.stringify({error}));
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(406).send(JSON.stringify({error: "Invalid Email/Password Combination"}));
      };
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(406).send(JSON.stringify({error: "Invalid Email/Password Combination"}));
  };
});

module.exports = router;
