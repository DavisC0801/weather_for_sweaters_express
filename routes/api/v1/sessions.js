const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const user = require('../../../models').User;

router.post('/', function(req, res) {
  if (req.body.email !== undefined){
    user.findOne({
      where: {
        email: req.body.email
      }
    }).then(existingUser => {
        bcrypt.compare(req.body.password, existingUser.password)
        .then(passwordMatch => {
          if (passwordMatch) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify({api_key: existingUser.apiKey}));
          } else {
            res.setHeader("Content-Type", "application/json");
            res.status(406).send(JSON.stringify({error: "Invalid Email/Password Combination"}));
          }
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

module.exports = router;
