const express = require('express');
const session = require('express-session');
const { pool } = require('./models/sqlModels');
const PGSession = require('connect-pg-simple')(session);


// Below is the express instanst and port number
const app = express();
const port = 3000;
const apiRouter = require('./routes/apiRouter');

//using express json() so we have access to the body
app.use(express.json());
app.use(session({
  store: new PGSession({
    pool: pool, 
  }),
  secret: '123abc456',
  rolling: true, 
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 1200
  }
}))
// app.use(ex

app.use('/api', apiRouter);



// Catch All error handler
app.use((req, res) => {
  res.status(404).send('Resource Not Found');
})


// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Unhandled Error in Middleware chain', 
    status: 500,
    message: {err: 'Unable to fullfill request'}
  }

  const custom = {
    ...defaultErr,
    ...err
  }

  console.log(custom.log);
  res.status(custom.status).json(custom.message);
})





//Port listener
app.listen(port, () => console.log(`Listening on port ${port}`));
