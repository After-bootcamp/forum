const env = require('../env.js');
const express = require('express');
const expressJWT = require('express-jwt');
const auth = require('../models/queries/auth.js')

const api = express();

api.route('/users')
  //get all users
  // .get()
  //login
  .post()
  //sign up
  .post('/new', auth.createUser, (req, res) => {
    res.send('created user');
  })
