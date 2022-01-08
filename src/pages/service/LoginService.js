import {BaseAxios} from "../../core/BaseAxios";
import React from "react";

export class LoginService {
    static login(login, password) {
        return BaseAxios.getAxios().post("api/login", {login, password}).then((response) => {
            const token = response.data.token
            const username = response.data.username
            localStorage.setItem("token", token)
            localStorage.setItem("username", username)
            BaseAxios.updateHeader()
        })
    }

    static getUsername() {
        return localStorage.getItem("username")
    }
}
