const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const config = require('./config/key');

const { User } = require('./model/User');//import로 하지 않는 이유는 뭘까

app.use(bodyParser.urlencoded({ extended: true }));//데이터를 분석해서 가져온다? application/x-www-form-urlencoded
app.use(bodyParser.json());//json타입으로 된것을 분석해서 가져온다

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));


app.get('/', (req, res) => res.send('hello'));

app.post('/register', (req, res) => {//회원가입을 하면 클라이언트에서 정보를 가져와서 데이터베이스에 넣어준다 
  const user = new User(req.body);

  user.save((err, doc) => {//mongodb 메소드
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true })
  });
})
const port = 5000;
app.listen(port, () => console.log(` app listening on port ${port}!`));
