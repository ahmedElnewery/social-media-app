import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/";
export function register(userInfo) {

  return axios.post("/register", userInfo);
}
export function login(userInfo) {
  

  return axios.post("/login", userInfo);
}
