import express from 'express';

// Below is the express instanst and port number
const app = express();
const port = 3000;

//using express json() so we have access to the body
app.use(express.json());
// app.use(ex

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

//Port listener
app.listen(port, () => console.log(`Listening on port ${port}`));
