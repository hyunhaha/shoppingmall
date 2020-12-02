
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jsonwebtoken = require('jsonwebtoken');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,//스페이스로 생긴 공백을 없애준다
    unique: 1
  },
  password: {
    type: String,
    minLength: 5
  },
  lastname: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String,
  }, tokenExp: {
    type: Number
  }
});

userSchema.pre('save', function (next) { //mongdb에 저장하기 전에 콜백함수를 실행한다.
  //비밀번호 암호화
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


userSchema.methods.comparePassword = function (plainPassword, cf) {
  //데이터 베이스에 저장되어 있는 암호화된 비밀번호와 입력한 비밀번호가 같은지 보기 위해서 입력한 비밀번호를 암호화해야함
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cf(err);
    cf(null, isMatch)
  })
}

userSchema.methods.generateToken = function (cf) {
  //jsonwebtoken이용해서 토큰생성
  let user = this;
  let token = jsonwebtoken.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save(function (err, user) {
    if (err) return cf(err);
    cf(null, user);
  })

}
userSchema.statics.findByToken = function (token, cf) {
  let user = this;

  //토큰을 디코드 한다.
  jsonwebtoken.verify(token, 'secretToken', function (err, decoded) {
    //userId를 이용해서 유저를 찾는다.
    //클라이언트에서 가져온 토큰과 비교
    if (err) throw err;
    user.findOne({ "_id": decoded, "token": token }, function (err, user) {
      if (err) return cf(err);
      cf(null, user)
    })
  });
};
const User = mongoose.model('User', userSchema);//스키마를 모델로 감싼다

module.exports = { User };