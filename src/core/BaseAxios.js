import axios from "axios";

export class BaseAxios {
    static axios = axios.create({baseURL: "http://localhost:8080"})

    static getAxios() {
        return this.axios;
    }
}