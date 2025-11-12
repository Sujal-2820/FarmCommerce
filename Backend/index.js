require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL) // set your MongoDB URI in a .env file
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
