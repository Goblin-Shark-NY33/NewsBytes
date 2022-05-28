const express = require('express');
const apiController = require('../controllers/rssController');
const pgContorller = require('../controllers/postgrescontroller')
const Router = express.Router();



Router.get('/',
  apiController.getTransformRSS,
  (req, res) => {
    return res.status(200).json({ data: res.locals.data })
  })


Router.post('/login',
  // pgContorller.validateUser,
  (req, res) => {
    console.log(req.session);
    return res.status(200).json(res.locals.validationResponse);
  })


Router.get('/user')
Router.post('/user')
Router.put('/user')



module.exports = Router