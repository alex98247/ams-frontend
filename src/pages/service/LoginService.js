import {BaseAxios} from "../../core/BaseAxios";

export class LoginService {
    static login(login, password) {
        return BaseAxios.getAxios().post("api/login", {login, password}).then((response) => {
            const token = response.data.token
            localStorage.setItem("token", token)
        })
    }
}
