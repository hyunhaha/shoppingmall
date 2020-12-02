
const mongoose = require('mongoose');

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
  lastName: {
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

const User = mongoose.model('User', userSchema);//스키마를 모델로 감싼다

module.exports = { User };