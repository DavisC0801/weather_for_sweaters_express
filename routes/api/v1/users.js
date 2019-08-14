const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const router = express.Router();
const user = require('../../../models').User;

router.post('/', function(req, res) {
  let existingUser = user.findOne({
    where: {
      email: req.body.email
    }
  });
  if (req.body.password === req.body.password_confirmation && existingUser === null){
    user.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      apiKey: crypto.randomBytes(14).toString('hex')
    })
    .then(user => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify({api_key: user.apiKey}));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(406).send("{ \n Invalid Email/Password Combination }")
  };
});

module.exports = router;
