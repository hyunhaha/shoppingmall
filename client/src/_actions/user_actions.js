import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types'

export function loginUser(loginInfo) {
  const request = axios.post("api/users/login", loginInfo) //
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request

  }
}
export function registerUser(registerInfo) {
  const request = axios.post("/api/users/register", registerInfo) //
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request

  }
}

export function auth() {
  const request = axios.get("/api/users/auth") //
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request

  }
}