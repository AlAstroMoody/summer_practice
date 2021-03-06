import axios from "axios";

const TOKEN =
  localStorage.getItem("token") === null
    ? ""
    : "token " + localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://0.0.0.0:8000/api/",
  headers: {
    Authorization: `${TOKEN}`,
    "Content-Type": "multipart/form-data"
  }
});

export default instance;
