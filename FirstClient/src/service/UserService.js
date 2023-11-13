import instance from "../utils/axios";

class UserService {
    async registerUser(body) {
        const res = await instance({
            method : "post",
            url : `/user/register`,
            data : {...body},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    }

    async loginUser(body) {
        const res = await instance({
            method : "post",
            url : `/user/login`,
            data : {...body},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    }
    
    async logoutUser() {
        const res = await instance({
            method : "post",
            url : `/user/logout`,
            data : {},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    }
    
    async authUser(body) {
        const res = await instance({
            method : "post",
            url : `/user/auth`,
            data : {},
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        })
        return res;
    } 
}

let userService = new UserService();
export default userService;