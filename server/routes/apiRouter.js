const express = require('express');
const apiController = require('../controllers/rssController');
const pgContorller = require('../controllers/postgrescontroller')
const Router = express.Router();


Router.post('/newUser',
  pgContorller.createNewUser, (req, res) => {
    console.log(res.locals.createNewUserResponse)
    return res.status(200).json(res.locals.createNewUserResponse);
  })


Router.post('/login',
  pgContorller.validateUser,
  (req, res) => {
    console.log(req.session);
    return res.status(200).json(res.locals.validationResponse);
  })


Router.get('/user')
Router.post('/user')
Router.put('/user')



Router.get('/',
  apiController.getTransformRSS,
  pgContorller.processRSS,

  (req, res) => {
    return res.status(200).json({ data: res.locals.data })
  })


module.exports = Router