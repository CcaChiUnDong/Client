import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:8080",
        headers : {
                "content-type" : "application/json;charset-UTF-8",
                accept : "application/json,",
        }
});

export default instance;