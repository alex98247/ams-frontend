import {BaseAxios} from "../../core/BaseAxios";

export class LoginService {
    static login(login, password) {
        BaseAxios.getAxios().post("", {login, password}).then((response) => {
            const token = response.data.token
            localStorage.setItem("token", token)
        })
    }
}
