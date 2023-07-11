require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors')
const userController = require('./src/app/controller/userController');
const loginHandler = require('./src/app/controller/authController');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Route tanımlamaları
app.post('/login', loginHandler);

app.use('/users', userController);

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
