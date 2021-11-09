import axios from "axios";

export class BaseAxios {
    static axios = axios.create({baseURL: "http://localhost:8080"})

    static headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

    static getAxios() {
        return this.axios;
    }

    static getBaseHeaders(){
        return this.headers
    }
}