const express = require('express');
const apiController = require('../controllers/rssController');
const pgContorller = require('../controllers/postgrescontroller')
const Router = express.Router();


Router.post('/login',
  pgContorller.validateUser,
  (req, res) => {
    console.log(req.session);
    return res.status(200).json(res.locals.validationResponse);
  })

Router.get('/user')
Router.post('/user')
Router.put('/user')
Router.post('/addSource', pgContorller.addSource, (req, res) => {
  return res.status(200).json(res.locals.addSourceResponse);
})
Router.post('/addCategory')

Router.get('/',
  apiController.getTransformRSS,
  (req, res) => {
    return res.status(200).json({ data: res.locals.data })
  })

Router.get('/sources',
  pgContorller.getSources,
  (req, res) => {
    res.status(200).json(res.locals.data)
  }
)

module.exports = Router