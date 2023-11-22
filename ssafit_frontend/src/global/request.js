import axios from "axios";
import {getCookie} from "./cookie";
const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_BASEURL,
    headers: {
        "content-type": "application/json;charset-UTF-8",
        accept: "application/json,",
    },
});

instance.interceptors.request.use(
    (config) => {
      console.log('axios.js request : ' , config);
      config.headers.Authorization = getCookie("ccachiToken");
      return config
    }, 
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (res) => {
      console.log('axios.js response : ' , res);
      return res
    },
    (error) => {
      return Promise.reject(error);
    }
  )

export default instance;