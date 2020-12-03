const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const config = require('./server/config/key');
const cookieparser = require('cookie-parser');

const { User } = require('./server/model/User');//import로 하지 않는 이유는 뭘까
const { auth } = require('./server/middleware/auth');

app.use(bodyParser.urlencoded({ extended: true }));//데이터를 분석해서 가져온다? application/x-www-form-urlencoded
app.use(bodyParser.json());//json타입으로 된것을 분석해서 가져온다
app.use(cookieparser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));


app.get('/', (req, res) => res.send('hello'));

app.post('/api/users/register', (req, res) => {//회원가입을 하면 클라이언트에서 정보를 가져와서 데이터베이스에 넣어준다 
  const user = new User(req.body);

  user.save((err, doc) => {//mongodb 메소드
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ registerSuccess: true })
  });
});

app.post('/api/users/login', (req, res) => {
  //입력한 이메일이 데이터베이스에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {//이메일이 일치 하지 않으면
      return res.json({
        loginSuccess: false,
        message: '일차하는 이메일이 없습니다.'
      });
    };
    //이메일이 있다면 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 일치하지 않습니다.'
        });
      //비밀번호가 일치하면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        //토큰을 저장 (쿠키, 로컬 스토리지등) 지금은 쿠키에 하겠음
        res.cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  //미들웨어를 통과해왔으면 authentication is true
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: '' }, (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ logoutSuccess: true });
    });
});

app.get('/api/hello', (req, res) => {
  res.send('안녕하세영 하이항 s');
})
const port = 5000;
app.listen(port, () => console.log(` app listening on port ${port}!`));
