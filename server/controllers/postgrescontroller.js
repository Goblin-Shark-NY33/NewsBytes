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

// sign up a user
// input: request to sign up with username and password
// output: userId and confirmation that sign up was successful
sqlController.createNewUser = async (req, res, next) => {
  const { username, password } = req.body;
  const values = [username, password];
  // console.log(values);

  try {
    const data = await db.query(sqlQueries.createNewUser, values)

    // console.log('This is the data coming back from the createNewUser query: \n', data);

    res.locals.createNewUserResponse = {
      createdNew: true,
      userId: data.rows[0]._id,
    }

    // console.log(res.locals.createNewUserResponse);

    return next();
  } catch (err) {
    res.locals.createNewUserResponse = {
      createdNew: false,
      statusMessage: "Username is alredy in use",
      userId: "",
    }
    next({
      log: `Error ocurred in createNewUser query controller - username is already in use: ${err}`,
      status: 400,
      message: { err: 'An error ocurred in the createNewUser query controller username is already in use' },
    })
  }

}

sqlController.processRSS = async (req, res, next) => {
  // will be on { data: res.locals.data }
  console.log("entered the processRSS function");
  console.log(res.locals.data[0]);
  const addedArticleIds = [];
  const { userId } = req.body
  console.log(userId);

  for (let i = 0; i < res.locals.data.length; i++) {
    // console.log(res.locals.data[0]);
    const { title, description, link, pubDate, author, category, source } = res.locals.data[i];
    const { height } = res.locals.data[i].img || "na";
    const { medium } = res.locals.data[i].img || "na";
    const { url } = res.locals.data[i].img || "na";
    const { width } = res.locals.data[i].img || "na";
    const values1 = [source, title, description, pubDate, height, medium, url, width, author, category, link];

    try {
      const addArticlesToArticlesDb = await db.query(sqlQueries.addRSSToDb, values1);
      console.log(addArticlesToArticlesDb);
      const values2 = [addArticlesToArticlesDb.rows[0]._id, userId, 0, 0];
      const addArticleRefsToUsers = await description.query(sqlQueries.addArticleRefsToUsers, values2);
      console.log(addArticleRefsToUsers);
      next();
    } catch (err) {
      // res.locals.addNewArticlesResponse = {
      //   createdNew: false,
      //   statusMessage: "Username is alredy in use",
      //   userId: "",
      // }
      next({
        log: ` ${err}`,
        status: 400,
        message: { err: 'Generic error message' },
      })
    }


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