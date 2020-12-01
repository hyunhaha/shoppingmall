const express = require('express');
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hyunha:abcd1234@study.wkcva.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

const client_id = '0G60QJQ4IvliZC3X0lTP';
const client_secret = 'bY8fhZxK4C';
app.get('/', (req, res) => res.send('hello'));

const port = 5000
app.listen(port, () => console.log(` app listening on port ${port}!`));
