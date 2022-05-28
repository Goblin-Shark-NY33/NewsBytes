const fs = require('fs/promises');
const { parse } = require('path');
const path = require('path');
const db = require('../models/sqlModels');
const sqlQueries = require('../models/sqlQueryStore');


const sqlController = {};

// get users's articles
// input: user
// output: all user articles
sqlController.getUserArticles = async (req, res, next) => {
  const userID = req.query.id;
  const values = [userID];

  try {

    const data = await db.query(sqlQueries.getUserArticles, values);
    console.log('This is the data coming back from the getUserArticles query: \n', data);
    res.locals.queryResponse = data.rows;
    return next();

  } catch (err) {
    next({
      log: `Error ocurred in getUserArticles query controller: ${err}`,
      status: 400,
      message: { err: 'An error ocurred in the getUserArticles query controller' },
    })
  }
}

// validate username and password
// input: object with username property and password property
// output: error if there is no username or if password incorrect
// output: if username and password is correct, then return the user id
sqlController.validateUser = async (req, res, next) => {
  const { username, password } = req.body;
  const values = [username, password];
  console.log(values);
  try {

    const data = await db.query(sqlQueries.validateUser, values);

    if (!data.rows.length) {
      res.locals.validationResponse = {
        verified: false,
        userId: "",
        userName: "",
      }
      return next({
        log: 'Username or password are incorrect',
        status: 500,
        message: { err: 'Username or passwsord are incorrect' },
      })
    } else {
      console.log('This is the data coming back from the calidateUser queryy: \n', data);
      res.locals.validationResponse = {
        verified: true,
        userId: data.rows[0].userID,
        userName: data.rows[0].userName,
      }
      req.session.user = {
        verified: true,
        userId: data.rows[0].userID,
      }
      console.log(res.locals.validationResponse);
    }

    return next();

  } catch (err) {
    next({
      log: `Error ocurred in validateUser query controller: ${err}`,
      status: 400,
      message: { err: 'An error ocurred in the validateUser query controller' },
    })

  }
}


// get a user's sources for fetch request
// input: user
// output: list of users html rss feed sources in html object


// like an article
// input: user id and article id
// output: updated list or user articles with updated like tags 

// delete an article
// input: user id and article id
// output: updatd list of user articles without "deleted" article (will just be a tag in the database)

// delete a source
// input: user id and source id
// output: updated list of user articles without the "deleted" source (will just be a tag in the database?)

// mark as read
// input: user id and article id
// output: updated list of user articles with the updated "read" field

module.exports = sqlController;