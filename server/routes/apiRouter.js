const express = require('express');
const apiController = require('../controllers/rssController')
const Router = express.Router(); 



Router.get('/', 
  apiController.getTransformRSS,
  (req, res) => {
    res.status(200).json({data: res.locals.data})
  })

Router.get('/user')
Router.post('/user')
Router.put('/user')



module.exports = Router